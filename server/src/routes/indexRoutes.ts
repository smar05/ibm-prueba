import { Router } from "express";
import { indexController } from "../controllers/indexController";

class IndexRoutes {
  private router: Router = Router();

  constructor() {
    this.config();
  }

  public config(): void {
    this.router.get("/llaves", indexController.llaves);
    this.router.post("/escenario", indexController.escenario);
  }

  // Getters y Setters
  public getRouter(): Router {
    return this.router;
  }
}

const indexRoutes = new IndexRoutes();

export default indexRoutes.getRouter();
