const Router = require("express");
const router = new Router();
const controller = require("../controller/article");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post("/", roleMiddleware(["moderator"]), controller.createArticle);
router.get("/",roleMiddleware(['moderator', 'admin', 'member']), controller.getArticle);

module.exports = router;
