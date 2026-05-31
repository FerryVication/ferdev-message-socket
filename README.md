# Ferdev Message Socket Gateway

Realtime WebSocket gateway dibuat khusus untuk FerdevAPI.\
Project ini berfungsi sebagai layer komunikasi realtime berbasis room,
tanpa mengganggu arsitektur REST utama.

Gateway ini menangani: - Room-based messaging - Online user tracking -
Broadcast event - Integrasi dengan REST API - CORS configuration -
Health monitoring

Dirancang modular supaya scalable dan maintainable.

------------------------------------------------------------------------

## 📌 Overview

Arsitektur dipisah dengan jelas:

REST API → Business logic & persistence\
Socket Gateway → Realtime transport layer

Gateway ini tidak menyimpan state permanen (kecuali tracking online user
di memory).\
Semua persistence tetap berada di REST API / database.

------------------------------------------------------------------------

## 🚀 Features

-   Room-based chat
-   Emit ke room tertentu
-   Track online users
-   Health check endpoint
-   Modular controller & routes structure
-   Clean separation between socket layer and HTTP layer

------------------------------------------------------------------------

## 🏗 Project Structure

ferdev-message-socket/ │ ├── config/ │ ├── cors.js │ └── db.js │ ├──
controllers/ │ └── message.controller.js │ ├── middlewares/ │ └──
notFound.js │ ├── routes/ │ ├── health.routes.js │ └── message.routes.js
│ ├── socket/ │ ├── chat.socket.js │ └── index.js │ ├── utils/ │ └──
onlineUsers.js │ ├── .env ├── .env.example ├── .gitignore ├── app.js ├──
server.js ├── package.json └── package-lock.json

------------------------------------------------------------------------

## 🧠 Architecture Flow

1.  Client connect ke WebSocket\
2.  Client join room\
3.  REST API trigger emit (atau socket event langsung)\
4.  Gateway broadcast ke room target\
5.  Online user registry update otomatis

Online users disimpan di memory (Map/Object) untuk lookup cepat.

------------------------------------------------------------------------

## 🔧 Environment Variables

Contoh `.env`:

PORT=3001\
CLIENT_ORIGIN=http://localhost:3000

Gunakan `.env.example` sebagai template.

------------------------------------------------------------------------

## ▶️ Installation

Install dependencies:

npm install

Run development mode:

npm run dev

Run production mode:

npm start

Jika menggunakan PM2:

pm2 start server.js --name message-gateway

------------------------------------------------------------------------

## 📡 Health Check

Endpoint untuk monitoring service:

GET /health

Digunakan untuk uptime monitoring atau reverse proxy validation.

------------------------------------------------------------------------

## 🔌 Integration With REST API

Gateway dapat diintegrasikan dengan:

-   Internal HTTP request dari REST API\
-   Shared Redis pub/sub (untuk scaling horizontal)

Untuk deployment multi-instance disarankan menggunakan Redis adapter
untuk Socket.IO.

------------------------------------------------------------------------

## 🛡 Error Handling

-   Global not found middleware\
-   Structured controller pattern\
-   Graceful server bootstrap

------------------------------------------------------------------------

## 📈 Future Improvements

-   Redis adapter untuk horizontal scaling\
-   Rate limiting per socket\
-   Message acknowledgment system\
-   Persistent online state via Redis

------------------------------------------------------------------------

## 📜 Notes

-   Gateway ini bukan message broker.\
-   Tidak menyimpan history chat.\
-   Fokus hanya pada realtime transport layer.

Loose coupling by design.\
REST API dan Gateway dapat berjalan independen.

------------------------------------------------------------------------

## 🧑‍💻 Creator

dibuat khusus untuk FerdevAPi oleh FeriPratama