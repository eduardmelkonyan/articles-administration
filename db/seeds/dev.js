/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const bcrypt = require("bcrypt");
const password = "somePassword";
const hashedPassword = bcrypt.hashSync(password, 7);
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex.raw('TRUNCATE TABLE "user" CASCADE');

  await knex("user").insert([
    {
      name: "Eduard",
      login: "eduard",
      password: hashedPassword,
      role: "member",
    },
    {
      
      name: "Tigran",
      login: "tigran",
      password: hashedPassword,
      role: "moderator",
    },
    {
      name: "Davit",
      login: "davit",
      password: hashedPassword,
      role: "admin",
    },
  ]);
};
