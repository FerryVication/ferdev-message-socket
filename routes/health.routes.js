const router = require("express").Router();
const onlineUsers = require("../utils/onlineUsers");

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    status: 200,
    creator: "Feri",
    message: "Semua Berjalan Normal",
    onlineUsers: onlineUsers.size,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;