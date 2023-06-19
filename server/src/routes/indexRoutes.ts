import { Router } from "express";
import { indexController } from "../controllers/indexController";

class IndexRoutes {
  private router: Router = Router();

  constructor() {
    this.config();
  }

  /**
   * Configuracion de las rutas
   *
   * @memberof IndexRoutes
   */
  public config(): void {
    /**
     * @openapi
     * /api/llaves:
     *   get:
     *     tags:
     *       - Llaves
     *     responses:
     *       200:
     *         description: Metodo para tener las llaves de encriptacion
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 llave:
     *                   type: object
     *                   properties:
     *                      publicKey:
     *                        type: string
     *                        example:
     *                      privateKey:
     *                        type: string
     *                        example:
     */
    this.router.get("/llaves", indexController.llaves);

    /**
     * @openapi
     * /api/escenario:
     *   post:
     *     tags:
     *       - Escenario
     *     requestBody:
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                flujo:
     *                  type: string
     *                  description: Valor del flujo (obligatorio)
     *                numDocumento:
     *                  type: string
     *                  description: Valor del número de documento (opcional)
     *                nombre:
     *                  type: string
     *                  description: Valor del nombre (opcional)
     *     responses:
     *       200:
     *         description:
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 llave:
     *                   type: string
     *                 exitoso:
     *                    type: boolean
     *                 mensaje:
     *                    type: string
     */
    this.router.post("/escenario", indexController.escenario);
  }

  // Getters y Setters
  public getRouter(): Router {
    return this.router;
  }
}

const indexRoutes = new IndexRoutes();

export default indexRoutes.getRouter();
