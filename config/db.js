const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

(async () => {
  try {
    const conn = await pool.getConnection();
    console.log(" MySQL Database Connected");
    conn.release();
  } catch (err) {
    console.error(" Database Connection Error:", err.message);
    process.exit(1);
  }
})();

module.exports = pool;
