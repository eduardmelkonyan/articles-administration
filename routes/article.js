const Router = require("express");
const router = new Router();
const controller = require("../controller/article");
const roleMiddleware = require("../middleware/roleMiddleware");
const multer = require("multer");

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image"));
    }
    cb(undefined, true);
  },
});

router.post("/", roleMiddleware(["moderator"]), upload.single("image"), controller.createArticle);
router.get("/",roleMiddleware(['moderator', 'admin', 'member']), controller.getArticle);

module.exports = router;
