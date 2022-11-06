const Router = require("express");
const router = new Router();
const controller = require("../controller/category");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post('/',roleMiddleware(['admin', 'moderator']), controller.createCategory)
router.get('/', roleMiddleware(['admin', 'moderator', 'member']), controller.getCategories)
router.delete('/:id', roleMiddleware(['admin']), controller.removeCategory)
module.exports = router
