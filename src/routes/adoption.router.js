import { Router } from "express";
import AdoptionModel from "../models/Adoption.model.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Adoptions
 *   description: Endpoints para gestionar adopciones
 */

/**
 * @swagger
 * /api/adoptions:
 *   get:
 *     summary: Obtener todas las adopciones
 *     tags: [Adoptions]
 *     responses:
 *       200:
 *         description: Lista de adopciones obtenida correctamente
 *       500:
 *         description: Error en el servidor
 */
router.get("/", async (req, res) => {
  try {
    const adoptions = await AdoptionModel.find().populate("pet").populate("user");
    res.json({ status: "success", payload: adoptions });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

/**
 * @swagger
 * /api/adoptions:
 *   post:
 *     summary: Crear una nueva adopción
 *     tags: [Adoptions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pet
 *               - user
 *             properties:
 *               pet:
 *                 type: string
 *                 example: 6711aabc8df2c41d2e534c2b
 *               user:
 *                 type: string
 *                 example: 67117cfb5a7a2e2a405f0c1a
 *     responses:
 *       201:
 *         description: Adopción creada correctamente
 *       400:
 *         description: Faltan datos obligatorios
 *       500:
 *         description: Error interno del servidor
 */
router.post("/", async (req, res) => {
  try {
    const { pet, user } = req.body;
    if (!pet || !user) return res.status(400).json({ status: "error", message: "Faltan datos" });
    const newAdoption = await AdoptionModel.create({ pet, user });
    res.status(201).json({ status: "success", payload: newAdoption });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

/**
 * @swagger
 * /api/adoptions/{id}:
 *   get:
 *     summary: Obtener una adopción por ID
 *     tags: [Adoptions]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la adopción
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Adopción encontrada
 *       404:
 *         description: No encontrada
 *       500:
 *         description: Error del servidor
 */
router.get("/:id", async (req, res) => {
  try {
    const adoption = await AdoptionModel.findById(req.params.id).populate("pet").populate("user");
    if (!adoption) return res.status(404).json({ status: "error", message: "No encontrada" });
    res.json({ status: "success", payload: adoption });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

/**
 * @swagger
 * /api/adoptions/{id}:
 *   delete:
 *     summary: Eliminar una adopción por ID
 *     tags: [Adoptions]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la adopción
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Adopción eliminada
 *       404:
 *         description: No encontrada
 *       500:
 *         description: Error interno
 */
router.delete("/:id", async (req, res) => {
  try {
    const result = await AdoptionModel.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ status: "error", message: "No encontrada" });
    res.json({ status: "success", message: "Adopción eliminada" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

export default router;
