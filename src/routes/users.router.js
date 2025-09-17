import { Router } from "express";
import UserModel from "../models/User.model.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await UserModel.find().populate("pets");
    res.json({ status: "success", payload: users });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

export default router;
