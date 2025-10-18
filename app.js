import express from "express";
import mongoose from "mongoose";
import mocksRouter from "./src/routes/mocks.router.js";
import usersRouter from "./src/routes/users.router.js";
import petsRouter from "./src/routes/pets.router.js";
import adoptionRouter from "./src/routes/adoption.router.js";
import { swaggerDocs } from "./src/docs/swagger.js";

const app = express();
app.use(express.json());

// ✅ Conexión mongoDb
const MONGO_URL = process.env.MONGO_URL || "mongodb://mongo:27017/tuDB";

mongoose.connect(MONGO_URL)
  .then(() => console.log("✅ Mongo conectado correctamente"))
  .catch(err => console.error(" Error de conexión a MongoDB:", err));

//  Rutas principales
app.use("/api/mocks", mocksRouter);
app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);
app.use("/api/adoptions", adoptionRouter);

//  Doc Swagger
swaggerDocs(app);

//  Ruta raíz 
app.get("/", (req, res) => {
  res.redirect("/api/docs");
});

//  Inicialización del server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
  console.log(` Documentación disponible en http://localhost:${PORT}/api/docs`);
});

export default app;
