const express = require("express");
const cors = require("cors");
const corsConfig = require("./config/cors");

const app = express();

app.use(cors(corsConfig));
app.use(express.json());

// CEK KONEKSI
app.use("/health", require("./routes/health.routes"));
// MAIN ROUTES
app.use("/api/messages", require("./routes/message.routes"));
// 404 ENDPOINT
app.use(require("./middlewares/notFound"));

module.exports = app;