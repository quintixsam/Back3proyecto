import express from "express";
import mongoose from "mongoose";
import mocksRouter from "./src/routes/mocks.router.js";
import usersRouter from "./src/routes/users.router.js";
import petsRouter from "./src/routes/pets.router.js";

const app = express();
app.use(express.json()); // <- necesario para leer req.body

// Conexión a Mongo
mongoose.connect("mongodb://localhost:27017/tuDB")
    .then(() => console.log("Mongo conectado"))
    .catch(err => console.error(err));

app.use("/api/mocks", mocksRouter);
app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);

export default app;

