const router = require("express").Router();
const ctrl = require("../controllers/message.controller");

router.get("/:room", ctrl.getMessagesByRoom);
router.delete("/cleanup", ctrl.cleanupMessages);

module.exports = router;