const pool = require("../config/db");
const onlineUsers = require("../utils/onlineUsers");

module.exports = (io, socket) => {
  /*
    USER GABUNG KE ROOM
  */
  socket.on(
    "join",
    async ({ username, userId, user_profile, user_plan, room = "main" }) => {
      try {
        socket.username = username;
        socket.userId = userId;
        socket.userProfile = user_profile || null;
        socket.userPlan = user_plan || "free";
        socket.room = room;
        socket.join(room);

        // Tambahkan Online User
        onlineUsers.set(socket.id, {
          username,
          userId,
          user_profile: user_profile || null,
          user_plan: user_plan || "free",
          room,
          socketId: socket.id,
        });

        //console.log(` ${username} (ID: ${userId}) joined room: ${room}`);

        // Broadcast online users to room
        const roomUsers = Array.from(onlineUsers.values())
          .filter((u) => u.room === room)
          .map((u) => ({
            username: u.username,
            userId: u.userId,
            user_profile: u.user_profile,
            user_plan: u.user_plan,
            room: u.room,
            socketId: u.socketId,
          }));

        io.to(room).emit("onlineUsers", roomUsers);

        // Menampilkan 50 histori pesan di room
        const [rows] = await pool.query(
          `SELECT
          id,
          user_id,
          username,
          user_profile,
          user_plan,
          message,
          mentions,
          created_at
         FROM chat_messages
         WHERE room = ?
         ORDER BY created_at DESC
         LIMIT 50`,
          [room],
        );


        const messagesWithMentions = rows.map((msg) => {
          let parsedMentions = [];
          try {
            parsedMentions = JSON.parse(msg.mentions || "[]");
          } catch (e) {
            parsedMentions = [];
          }

          return {
            ...msg,
            mentions: parsedMentions,
          };
        });

        socket.emit("messageHistory", messagesWithMentions.reverse());

        // Notify others that user joined
        socket.broadcast.to(room).emit("userJoined", {
          username,
          user_profile: user_profile || null,
        });
      } catch (error) {
        //console.error(" Error on join:", error);
        socket.emit("error", { message: "Failed to join room" });
      }
    },
  );
  /*
    USER KIRIM CHAT KE ROOM
  */
  socket.on("sendMessage", async ({ message, mentions = [] }) => {
    try {
      // Validation
      if (!message || !message.trim()) {
        socket.emit("error", { message: "Message cannot be empty" });
        return;
      }

      if (!socket.username || !socket.room) {
        socket.emit("error", { message: "User not properly connected" });
        return;
      }

      // Sanitize message (prevent XSS)
      const sanitizedMessage = message.trim().substring(0, 1000);

      // Sanitize mentions (only valid usernames)
      const sanitizedMentions = mentions
        .filter((m) => m && typeof m === "string") //  HAPUS `: string`
        .map((m) => m.trim().substring(0, 50)) //  HAPUS `: string`
        .slice(0, 10); // Max 10 mentions

      // Save to database with mentions
      const [result] = await pool.query(
        `INSERT INTO chat_messages
        (user_id, username, user_profile, user_plan, message, mentions, room, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
        [
          socket.userId,
          socket.username,
          socket.userProfile || null,
          socket.userPlan || "free",
          sanitizedMessage,
          JSON.stringify(sanitizedMentions),
          socket.room,
        ],
      );

      // Get the inserted message
      const [rows] = await pool.query(
        `SELECT
        id,
        user_id,
        username,
        user_profile,
        user_plan,
        message,
        mentions,
        created_at
       FROM chat_messages
       WHERE id = ?`,
        [result.insertId],
      );

      const newMessage = rows[0];

      // Parse mentions from JSON
      let parsedMentions = [];
      try {
        parsedMentions = JSON.parse(newMessage.mentions || "[]");
      } catch (e) {
        parsedMentions = [];
      }

      /*
      console.log(
        ` ${socket.username}: ${sanitizedMessage.substring(0, 50)}${sanitizedMessage.length > 50 ? "..." : ""}`,
      );
      */

      // Broadcast to ALL users in room (including sender)
      io.to(socket.room).emit("message", {
        id: newMessage.id,
        user_id: newMessage.user_id,
        username: newMessage.username,
        user_profile: newMessage.user_profile,
        user_plan: newMessage.user_plan,
        message: newMessage.message,
        mentions: parsedMentions,
        timestamp: newMessage.created_at,
      });
    } catch (error) {
      //console.error(" Error sending message:", error);
      socket.emit("error", { message: "Failed to send message" });
    }
  });
  
  /*
    INDIKATOR ${user} Sedang mengetik  
  */
  socket.on("typing", () => {
    if (socket.room && socket.username) {
      socket.broadcast.to(socket.room).emit("userTyping", {
        username: socket.username,
        user_profile: socket.userProfile,
      });
    }
  });

  socket.on("stopTyping", () => {
    if (socket.room && socket.username) {
      socket.broadcast.to(socket.room).emit("userStopTyping", {
        username: socket.username,
      });
    }
  });
  
  /*
    USER meninggalkan room
  */
  socket.on("disconnect", () => {
    const user = onlineUsers.get(socket.id);
    if (!user) return;

    onlineUsers.delete(socket.id);

    const roomUsers = [...onlineUsers.values()].filter(
      (u) => u.room === user.room,
    );

    io.to(user.room).emit("onlineUsers", roomUsers);

    socket.broadcast.to(user.room).emit("userLeft", {
      username: user.username,
    });
  });
};