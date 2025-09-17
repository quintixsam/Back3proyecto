import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";

export const generateUsers = async (num = 50) => {
  const users = [];

  for (let i = 0; i < num; i++) {
    const passwordHash = await bcrypt.hash("coder123", 10);

    users.push({
      _id: faker.database.mongodbObjectId(),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: passwordHash,
      role: faker.helpers.arrayElement(["user", "admin"]),
      pets: []
    });
  }

  return users;
};
