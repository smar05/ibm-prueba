import { Router } from "express";

class IndexRoutes {
  private router: Router = Router();

  constructor() {
    this.config();
  }

  public config(): void {
    this.router.get("/", (req, res) => {
      res.send("Hello");
    });
  }

  // Getters y Setters
  public getRouter(): Router {
    return this.router;
  }
}

const indexRoutes = new IndexRoutes();

export default indexRoutes.getRouter();
