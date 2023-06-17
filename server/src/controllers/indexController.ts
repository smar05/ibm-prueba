import { Request, Response } from "express";

class IndexController {
  constructor() {}

  /**
   * Metodo para tener la llave de encriptacion
   *
   * @param {Request} req
   * @param {Response} res
   * @memberof IndexController
   */
  public llaves(req: Request, res: Response): void {
    res.json({
      llave:
        "MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgFziZlz1VnGhqISYCoKet7ED8pEJU5Y3XoZ7Pep8LCFUlKZ+bZTmgq4gawbpVtUCMJlTIDyQcT2zlzyBDLbBPgsDdEw868F9TioOjbQ+l6dfrXIuaRR3n8+IKEx2NIP0HtwtIjwKNv1nhbmEttYau/fAtxi/Xvw2mmAXi+e3kFJPAgMBAAE=",
    });
  }
}

export const indexController = new IndexController();
