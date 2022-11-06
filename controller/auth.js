const User = require("../db/models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const knex = require("knex");

const generateAccessToken = (id, role) => {
  const payload = {
    id,
    role,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });
};

class AuthController {
  async registration(req, res) {
    try {
      const { name, login, password, role } = req.body;
      const candidate = await User.query().findOne({ login });
      if (candidate) {
        return res.status(400).send({ message: "User alredy exist!" });
      }
      const hashedPassword = bcrypt.hashSync(password, 7);
      const user = await User.query().insert({
        name,
        login,
        password: hashedPassword,
        role,
      });
      res.status(201).send(user);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  }

  async login(req, res) {
    try {
      const { login, password } = req.body;
      const user = await User.query().findOne({ login });
      if (!user) {
        return res
          .status(400)
          .send({ message: `User with login "${login}" not found!` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).send({ message: "Wrong password" });
      }
      const token = generateAccessToken(user.id, user.role);
      res.send({ token });
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  }
}

module.exports = new AuthController();
