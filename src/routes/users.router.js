import { Router } from "express";
import UserModel from "../models/User.model.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints para gestión de usuarios
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 payload:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 67117cfb5a7a2e2a405f0c1a
 *                       first_name:
 *                         type: string
 *                         example: Samuel
 *                       last_name:
 *                         type: string
 *                         example: Quintero
 *                       email:
 *                         type: string
 *                         example: samuel@gmail.com
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/", async (req, res) => {
  try {
    const users = await UserModel.find().populate("pets");
    res.json({ status: "success", payload: users });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

export default router;
