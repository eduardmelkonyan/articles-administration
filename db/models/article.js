const { Model } = require("objection");
const Category = require("./category");
const User = require("./user");

class Article extends Model {
  static tableName = "article";
  static relationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: "article.user_id",
        to: "user.id",
      },
    },
    category: {
      relation: Model.BelongsToOneRelation,
      modelClass: Category,
      join: {
        from: "article.category_id",
        to: "category.id",
      },
    },
  };
}

module.exports = Article;
