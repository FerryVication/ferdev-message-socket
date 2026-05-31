## 🚀 Ferdev Message Socket Gateway

Realtime WebSocket Gateway yang dirancang khusus untuk ekosistem FerdevAPI.

Gateway ini berfungsi sebagai Realtime Transport Layer yang terpisah dari REST API utama, sehingga komunikasi realtime dapat berjalan secara efisien tanpa membebani business logic maupun database layer.

---

## 📖 Overview

Architecture Separation

Gateway tidak menyimpan data permanen.
Semua data utama tetap disimpan melalui REST API dan database, sedangkan gateway hanya bertugas mengelola koneksi realtime dan distribusi event.

---

``` ruby
🏗️ Project Structure

ferdev-message-socket/
│
├── config/
│   ├── cors.js
│   └── db.js
│
├── controllers/
│   └── message.controller.js
│
├── middlewares/
│   └── notFound.js
│
├── routes/
│   ├── health.routes.js
│   └── message.routes.js
│
├── socket/
│   ├── chat.socket.js
│   └── index.js
│
├── utils/
│   └── onlineUsers.js
│
├── .env.example
├── .gitignore
├── app.js
├── server.js
├── package.json
└── package-lock.json

---
```
``` ruby
## 🧠 Architecture Flow

| Step | Action |
|--------|--------|
| 1 | Client connect ke WebSocket |
| 2 | Client join room |
| 3 | REST API trigger event |
| 4 | Gateway broadcast ke room |
| 5 | Client menerima event |
```
---

## 📦 Installation
``` bash
Install Dependencies

npm install

Development Mode
npm run dev

Production Mode
npm start

PM2 Deployment
pm2 start server.js --name ferdev-message-gateway

---
```
## 📡 Health Check

Endpoint monitoring untuk memastikan service berjalan dengan normal.
``` java
Request
GET /health

Response
{
  "success": true,
  "status": 200,
  "creator": "Feri",
  "message": "Semua Berjalan Normal",
  "onlineUsers": 0,
  "uptime": 1410.81436888,
  "timestamp": "2026-05-31T15:06:12.942Z"
}
```
---

## 🔌 REST API Integration

Gateway dapat menerima trigger event dari backend utama melalui:

Internal HTTP Request / websocket connection
``` bash
REST API
    │
    ▼
Gateway Endpoint
    │
    ▼
Socket Broadcast
```

## 🛡 Error Handling

Gateway menerapkan beberapa lapisan penanganan error:
``` text
- Global Not Found Middleware
- Structured Controller Pattern
- Graceful Server Bootstrap
- Centralized Error Response
```
---


## 📌 Notes

«Ferdev Message Socket Gateway bukan message broker.»
Prinsip utama project ini adalah Loose Coupling Architecture, sehingga REST API dan Gateway dapat berjalan secara independen.

---

## 👨‍💻 Creator

Feri Pratama

Built with ❤️ for the FerdevAPI ecosystem.