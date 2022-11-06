const Article = require("../db/models/article");
const sharp = require("sharp");

class ArticleController {
  async createArticle(req, res) {
    try {
      const buffer = await sharp(req.file.buffer)
        .resize({ width: 250, height: 250 })
        .png()
        .toBuffer();
      const article = await Article.query().insert({
        name: req.body.name,
        content: req.body.content,
        category_id: req.body.category_id,
        user_id: req.body.user_id,
        image: buffer,
      });
      res.status(201).send({ message: "Article has published!" });
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  }

  async getArticle(req, res) {
    try {
      const article = await Article.query()
        .withGraphFetched("user")
        .withGraphFetched("category");
    
      res.send(article);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  }
}

module.exports = new ArticleController();
