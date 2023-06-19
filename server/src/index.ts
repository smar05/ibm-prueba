import express, { Application } from "express";
import indexRoutes from "./routes/indexRoutes";
import morgan from "morgan";
import cors from "cors";
import { swaggerDocs } from "./swagger/swagger";

class Server {
  private app: Application;
  private API: string = "/api";
  private bodyParser = require("body-parser");

  constructor() {
    this.app = express();
    this.app.use(this.bodyParser.json());

    // Se inicializa la configuracion y las rutas
    this.config();
    this.routes();
  }

  /**
   * Configuracion del backend
   *
   * @memberof Server
   */
  public config(): void {
    this.app.set("port", process.env.PORT || 8080); // Se establece el puerto para el back
    this.app.use(morgan("dev")); // Para mostrar por consola las peticiones http
    this.app.use(cors()); // Para que el front pueda pedir los datos al back
    this.app.use(express.json()); // Aceptar formato JSON
    this.app.use(express.urlencoded({ extended: false }));
  }

  /**
   * Configuacion de las rutas del backend
   *
   * @memberof Server
   */
  public routes(): void {
    this.app.use(`${this.API}`, indexRoutes);
  }

  /**
   * Iniciar el backend
   *
   * @memberof Server
   */
  public start(): void {
    this.app.listen(this.app.get("port"), () => {
      console.log("Server on port: " + this.app.get("port"));

      swaggerDocs(this.app, this.app.get("port"));
    });
  }
}

const server = new Server();
server.start();
