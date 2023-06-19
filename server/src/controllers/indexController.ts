import { Request, Response } from "express";
import { functions } from "../common/functions";
import { Ikeys } from "../interfaces/ikeys";

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

    if (!req.body || !req.body.flujo) {
      console.error("Error: No se ha enviado un escenario");
      res
        .status(500)
        .json({ error: "Error genérico. No se ha enviado un escenario" });
    } else {
      let keys: Ikeys = functions.leerLlavesPublicasLocales();
      let flujoEncriptado: string = req.body.flujo;

      let flujo: string = functions.desencriptarValor(keys, flujoEncriptado);

      switch (flujo) {
        case "Inicio":
          let valorEncriptado: string = functions.encriptarValor(
            keys.publicKey,
            "Formulario"
          );
          res.json({ flujo: valorEncriptado });
          break;

        default:
          break;
      }
    }
  }
}

export const indexController = new IndexController();
