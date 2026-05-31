const pool = require("../config/db");

exports.getMessagesByRoom = async (req, res) => {
  const { room } = req.params;
  const limit = Math.min(+req.query.limit || 100, 500);

  const [rows] = await pool.query(
    `SELECT id, user_id, username, message, created_at
     FROM chat_messages WHERE room = ?
     ORDER BY created_at DESC LIMIT ?`,
    [room, limit]
  );

  res.json(rows.reverse());
};

exports.cleanupMessages = async (req, res) => {
  const days = +req.query.days || 30;

  const [result] = await pool.query(
    `DELETE FROM chat_messages
     WHERE created_at < DATE_SUB(NOW(), INTERVAL ? DAY)`,
    [days]
  );

  res.json({ deleted: result.affectedRows });
};