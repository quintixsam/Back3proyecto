import { Router } from "express";
import { generateUsers } from "../services/mocking.service.js";
import UserModel from "../models/User.model.js";
import PetModel from "../models/Pet.model.js";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

const router = Router();

// GET /api/mocks/mockingpets
router.get("/mockingpets", async (req, res) => {
  const pets = [];
  for (let i = 0; i < 100; i++) {
    pets.push({
      name: faker.animal.petName(),
      type: faker.animal.type(),
      adopted: faker.datatype.boolean()
    });
  }
  res.json({ status: "success", payload: pets });
});

// GET /api/mocks/mockingusers
router.get("/mockingusers", async (req, res) => {
  const users = await generateUsers(50);
  res.json({ status: "success", payload: users });
});

// POST /api/mocks/generateData
router.post("/generateData", async (req, res) => {
  try {
    const { users = 0, pets = 0 } = req.body;

    const passwordHash = await bcrypt.hash("coder123", 10);

    const usersToInsert = Array.from({ length: users }, () => ({
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: passwordHash,
      role: faker.helpers.arrayElement(["user", "admin"]),
      pets: []
    }));

    const petsToInsert = Array.from({ length: pets }, () => ({
      name: faker.animal.petName(),
      type: faker.animal.type(),
      adopted: false
    }));

    const insertedUsers = await UserModel.insertMany(usersToInsert);
    const insertedPets = await PetModel.insertMany(petsToInsert);

    res.json({
      status: "success",
      insertedUsers: insertedUsers.length,
      insertedPets: insertedPets.length
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
});

export default router;