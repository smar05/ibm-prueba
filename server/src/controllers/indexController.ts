import { Request, Response } from "express";
import { functions } from "../common/functions";
import { Ikeys } from "../interfaces/ikeys";
import { IescenarioData } from "../interfaces/iescenarioData";

class IndexController {
  constructor() {}

  /**
   * Metodo para tener las llaves de encriptacion
   *
   * @param {Request} req
   * @param {Response} res
   * @return {*}  {Response<any>}
   * @memberof IndexController
   */
  public async llaves(req: Request, res: Response): Promise<Response<any>> {
    console.info("Inicia metodo para obtener las llaves de encriptacion");

    let keys: Ikeys = { publicKey: "", privateKey: "" };

    // Se leen las llaves que esten almacenadas en los archivos locales
    keys = functions.leerLlavesPublicasLocales();

    // Si no hay llaves, se generan
    if (!(keys && keys.publicKey && keys.privateKey)) {
      // Llamar a la función para generar las llaves
      keys = await functions.generateRSAKeys();

      // Se escriben las llaves generadas en lso archivos loclaes
      functions.escribirLlavesEnArchivosLocales(keys);
    }

    return res.json({
      llave: keys,
    });
  }

  /**
   *
   *
   * @param {Request} req
   * @param {Response} res
   * @return {*}  {Promise<void>}
   * @memberof IndexController
   */
  public async escenario(req: Request, res: Response): Promise<void> {
    console.info("Inicia metodo para saber el escenario");

    let body: IescenarioData = req.body;

    if (!body || !body.flujo) {
      console.error("Error: No se ha enviado un escenario");
      res
        .status(500)
        .json({ error: "Error genérico. No se ha enviado un escenario" });
    } else {
      let keys: Ikeys = functions.leerLlavesPublicasLocales();
      let flujoEncriptado: string = body.flujo;

      let flujo: string = functions.desencriptarValor(keys, flujoEncriptado);

      switch (flujo) {
        case "Inicio":
          let valorEncriptado: string = functions.encriptarValor(
            keys.publicKey,
            "Formulario"
          );
          res.json({ flujo: valorEncriptado });
          break;

        case "Formulario":
          if (!(body.numDocumento && body.nombre)) {
            console.error("Error: No se han envidado todos los datos");

            console.error("Request: ", req);
            console.error("Respnse: ", res);

            res.status(500).json({
              exitoso: false,
              mensaje: functions.encriptarValor(
                keys.publicKey,
                "¡DATOS INCORRECTOS!"
              ),
            });
          } else {
            let data: any = {
              exitoso: true,
              mensaje: functions.encriptarValor(
                keys.publicKey,
                "¡DATOSRECIBIDOS!"
              ),
            };

            res.json(data);
          }

          break;

        default:
          break;
      }
    }
  }
}

export const indexController = new IndexController();
