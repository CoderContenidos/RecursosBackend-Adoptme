// import listEndpoints from "express-list-endpoints"
import cookieParser from "cookie-parser";
import displayRoutes from "express-routemap";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express"

import adoptionsRouter from "./routes/adoption.router.js";
import petsRouter from "./routes/pets.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import usersRouter from "./routes/users.router.js";
import __dirname from "./utils/index.js";

const PORT = process.env.PORT || 8080;
const URI = `mongodb://127.0.0.1:27017/adoptme`;
const app = express();
const specs = swaggerJSDoc({
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Adoptme Documentation",
      description: "API de prueba para clase de Swagger",
    }
  },
  apis: [path.join(__dirname, "../docs/**/*.yaml")]
});

mongoose.connect(URI);
app.use(express.json());
app.use(cookieParser());
app.use("/apidocs", swaggerUi.serve, swaggerUi.setup(specs))
app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);
app.use("/api/adoptions", adoptionsRouter);
app.use("/api/sessions", sessionsRouter);


mongoose.connection.on("connected", () => {
	console.log("Mongo Database connected");
	app.listen(PORT, () => {
    displayRoutes(app);
    // console.log(listEndpoints(app))
    console.log(`Listening on ${PORT}`
    )});
});
