import { Request, Response } from "express";

class IndexController {
  constructor() {}

  public index(req: Request, res: Response): void {
    res.json({ text: "API is /api" });
  }
}

export const indexController = new IndexController();
