const Category = require("../db/models/category");

class CategoryController {
  async createCategory(req, res) {
    try {
      const category = await Category.query().insert({
        name: req.body.name,
        description: req.body.description,
      });
      res.status(201).send(category);
    } catch (e) {
      res.status(400).send(e);
    }
  }

  async getCategories(req, res) {
    try {
      const categories = await Category.query();
      res.send(categories);
    } catch (e) {
      res.status(400).send(e);
    }
  }

  async removeCategory(req, res) {
    try {
      const { id } = req.params;
      await Category.query().deleteById(id);
      res.send({ message: "Category has removed" });
    } catch (e) {
      res.status(400).send(e);
    }
  }
}

module.exports = new CategoryController();
