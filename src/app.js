import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

import __dirname from "./dirname.js";
import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";
import adoptionsRouter from "./routes/adoption.router.js";
import sessionsRouter from "./routes/sessions.router.js";

const app = express();
const PORT = process.env.PORT || 8080;
const connection = mongoose.connect(
  `mongodb+srv://leonidas:od9a3mpDaIokUo3P@cluster0.1k06imr.mongodb.net/adoptme?retryWrites=true&w=majority`
);

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Adopt Me API",
      description: "Documentacíon que soporta al sistema Adopt Me",
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
};

const specs = swaggerJSDoc(swaggerOptions);

app.use(express.json());
app.use(cookieParser());
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);
app.use("/api/adoptions", adoptionsRouter);
app.use("/api/sessions", sessionsRouter);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
