# Examen Teórico Práctico Senior Angular y Node.JS - IBM

Este proyecto consiste en una aplicación de intercambio de información encriptada, construida con Angular (v14.2.0) en el frontend y Node.js (v18.12.1) con TypeScript (v5.1.3) y Express (v4.18.2) en el backend.

## Instalación y Configuración

### Frontend (Angular)

1. Clona este repositorio.
2. Navega a la carpeta `client`: `cd client`
3. Instala las dependencias: `npm install`
4. Inicia el servidor de desarrollo: `ng serve`

### Backend (Node.js + Express)

1. Clona este repositorio.
2. Navega a la carpeta `server`: `cd server`
3. Instala las dependencias: `npm install`
4. Inicia el build de TypeScript a JavaScript: `npm run build`
5. Inicia el servidor en modo de desarrollo: `npm run dev`

El backend se encarga de generar las llaves asimétricas RSA, mientras que el frontend y el backend intercambian información encriptada usando las llaves generadas. Para ello, se utilizan las librerías "nose-jose" y "node-forge".

## Uso

Una vez que los servidores están en ejecución, puedes acceder a la aplicación en tu navegador web en `http://localhost:4200`. La comunicación entre el frontend y el backend está encriptada y se maneja automáticamente.

## Documentación de APIs

La documentación de las APIs expuestas por el backend se encuentra disponible mediante Swagger. Puedes acceder a la documentación en `http://localhost:8080/api/docs/` una vez que el servidor está en ejecución.

## Pruebas

### Frontend

Se incluyen pruebas unitarias para el frontend. Para ejecutar las pruebas, utiliza el siguiente comando: `ng test`

### Backend

Se incluyen pruebas unitarias para el backend. Para ejecutar las pruebas, utiliza el siguiente comando: `npm run test`

## Criterios de Evaluación

Este proyecto será evaluado de acuerdo a los siguientes criterios:

- Arquitectura del proyecto frontend (Angular 14+).
- Manejo de rutas del lado del frontend.
- Arquitectura del proyecto backend (TypeScript + Express).
- Manejo de rutas del lado del backend.
- Cumplimiento de la encriptación de los datos.
- Cumplimiento de la desencriptación de los datos.

## Contacto

Si tienes alguna pregunta o comentario sobre este proyecto, no dudes en contactarme:

- Nombre: Ricardo Mantilla
- Correo electrónico: mantillasanchezr@gmail.com
