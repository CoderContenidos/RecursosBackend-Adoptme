import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import displayRoutes from "express-routemap";
// import listEndpoints from "express-list-endpoints"

import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";
import adoptionsRouter from "./routes/adoption.router.js";
import sessionsRouter from "./routes/sessions.router.js";

const app = express();
const PORT = process.env.PORT || 8080;
const URI = `mongodb://127.0.0.1:27017/adoptme`;
mongoose.connect(URI);

app.use(express.json());
app.use(cookieParser());

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
