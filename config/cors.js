module.exports = {
  origin: [
    process.env.CLIENT_URL,
    "http://localhost:3000",
    "https://ferdev.my.id",
    "https://api.ferdev.my.id",
    "https://www.ferdev.my.id",
  ],
  methods: ["GET", "POST"],
  credentials: true,
};
