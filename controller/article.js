const Article = require("../db/models/article");

class ArticleController {
  async createArticle(req, res) {
    try {
      const article = await Article.query().insert({
        name: req.body.name,
        content: req.body.content,
        category_id: req.body.category_id,
        user_id: req.body.user_id,
      });
      res.status(201).send(article);
    } catch (e) {
      res.status(400).send(e);
    }
  }

  async getArticle(req, res) {
    try {
      const article = await Article.query()
        .withGraphFetched("user")
        .withGraphFetched("category")
        .withGraphFetched("image");
      if (article[0].image !== null) {
        const imageBuffer = article[0].image.image;
        const base64 = Buffer.from(imageBuffer).toString("base64");
        article[0].image.image = base64;
      }
      res.send(article);
    } catch (e) {
      console.log(e);
      res.status(400).send(e);
    }
  }
}

module.exports = new ArticleController();
