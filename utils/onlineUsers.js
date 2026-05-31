/**
 * Menyimpan daftar user yang sedang online.
 * Key   : userId
 * Value : data user (socketId, metadata, dll)
 * 
 * Digunakan sebagai in-memory store (non-persistent).
 * Akan reset saat server restart.
*/

const onlineUsers = new Map();
module.exports = onlineUsers;
