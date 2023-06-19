import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Informacion sobre la API
const options: any = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "IBM encriptador",
      version: "1.0.0",
      description:
        "Prueba IBM: Examen Teórico Práctico Senior Angular y Node.JS",
      contact: {
        email: "mantillasanchezr@gmail.com",
      },
    },
  },
  apis: ["src/routes/*.ts"], // Ruta a los archivos que contienen las definiciones de las rutas de la API
};

// Docs en formato JSON
const swaggerSpec: object = swaggerJSDoc(options);

/**
 * Metodo para configurar docs
 *
 * @export
 * @param {*} app
 * @param {number} port
 */
export function swaggerDocs(app: any, port: number): void {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/api/docs.json", (req: any, res: any) => {
    res.setHeaders("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log(
    `Version 1 Docs esta disponible en http://localhost:${port}/api/docs`
  );
}
