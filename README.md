🚀 Ferdev Message Socket Gateway

Realtime WebSocket Gateway yang dirancang khusus untuk ekosistem FerdevAPI.

Gateway ini berfungsi sebagai Realtime Transport Layer yang terpisah dari REST API utama, sehingga komunikasi realtime dapat berjalan secara efisien tanpa membebani business logic maupun database layer.

---

📖 Overview

Architecture Separation

Layer| Responsibility
REST API| Business Logic, Authentication, Database Persistence
Socket Gateway| Realtime Communication & Event Broadcasting

Gateway tidak menyimpan data permanen.

Semua data utama tetap disimpan melalui REST API dan database, sedangkan gateway hanya bertugas mengelola koneksi realtime dan distribusi event.

---

✨ Features

Feature| Description
Room-Based Messaging| Mengirim event ke room tertentu
Online User Tracking| Melacak user yang sedang online
Broadcast Event| Mengirim event ke banyak client sekaligus
Health Monitoring| Endpoint monitoring service
Modular Architecture| Struktur project terpisah dan mudah dirawat
REST API Integration| Mudah diintegrasikan dengan backend utama

---

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

🧠 Architecture Flow

Client
   │
   ▼
WebSocket Connection
   │
   ▼
Join Room
   │
   ▼
REST API Trigger Event
   │
   ▼
Socket Gateway
   │
   ▼
Broadcast To Target Room
   │
   ▼
Connected Clients

Realtime Lifecycle

1. Client melakukan koneksi ke WebSocket.
2. Client bergabung ke room tertentu.
3. REST API atau socket event memicu broadcast.
4. Gateway mengirim event ke room tujuan.
5. Registry online user diperbarui secara otomatis.

---

⚙️ Environment Variables

".env"

PORT=3001
CLIENT_ORIGIN=http://localhost:3000

Gunakan file ".env.example" sebagai referensi konfigurasi.

---

📦 Installation

Install Dependencies

npm install

Development Mode

npm run dev

Production Mode

npm start

PM2 Deployment

pm2 start server.js --name ferdev-message-gateway

---

📡 Health Check

Endpoint monitoring untuk memastikan service berjalan dengan normal.

Request

GET /health

Response

{
  "status": "ok"
}

---

🔌 REST API Integration

Gateway dapat menerima trigger event dari backend utama melalui:

Internal HTTP Request

REST API
    │
    ▼
Gateway Endpoint
    │
    ▼
Socket Broadcast

Redis Pub/Sub (Recommended)

Untuk deployment multi-instance:

REST API
    │
    ▼
Redis Pub/Sub
    │
    ▼
Multiple Gateway Instances

Penggunaan Redis Adapter sangat disarankan untuk kebutuhan horizontal scaling.

---

🛡 Error Handling

Gateway menerapkan beberapa lapisan penanganan error:

- Global Not Found Middleware
- Structured Controller Pattern
- Graceful Server Bootstrap
- Centralized Error Response

---

📈 Roadmap

Planned Features

- Redis Adapter Support
- Socket Rate Limiting
- Message Acknowledgement System
- Distributed Online State via Redis
- Metrics & Monitoring Dashboard
- Cluster Mode Deployment

---

📌 Notes

«Ferdev Message Socket Gateway bukan message broker.»

Scope

✅ Realtime Event Delivery

✅ Room Management

✅ Online User Tracking

❌ Message Persistence

❌ Chat History Storage

❌ Business Logic Processing

Prinsip utama project ini adalah Loose Coupling Architecture, sehingga REST API dan Gateway dapat berjalan secara independen.

---

👨‍💻 Creator

Feri Pratama

Built with ❤️ for the FerdevAPI ecosystem.