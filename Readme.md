# Subscription Tracking System

<div align="center">

![Subscription Tracker](https://img.shields.io/badge/Subscription-Tracker-blue?style=for-the-badge)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![NeonDB](https://img.shields.io/badge/NeonDB-PostgreSQL-00E599?style=for-the-badge&logo=postgresql&logoColor=white)](https://neon.tech)
[![Prisma](https://img.shields.io/badge/Prisma-7.x-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://prisma.io)

**A TypeScript-based subscription management API built with Express.js, Prisma ORM, and NeonDB PostgreSQL for tracking and managing recurring subscriptions.**

</div>

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js |
| Language | TypeScript |
| Framework | Express.js |
| ORM | Prisma 7 |
| Database | NeonDB (PostgreSQL) |
| Auth | JWT + bcrypt |
| Validation | Zod |
| Logging | Morgan |

---

## Prerequisites

- Node.js v20+
- npm
- A [NeonDB](https://neon.tech) account (or any PostgreSQL database)

---

## Installation

```bash
# Clone the repository
git clone https://github.com/hollali/sub_tracker.git
cd sub_tracker

# Install dependencies
npm install

# Set up environment variables
cp .env .env.development.local
# Edit .env.development.local with your DATABASE_URL, JWT_SECRET, etc.

# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Start the development server
npm run dev
```

Your server is now running at `http://localhost:3000`.

---

## Configuration

Create a `.env.development.local` file:

```env
PORT=3000
NODE_ENV=development
DATABASE_URL="postgresql://user:password@your-neon-host/neondb?sslmode=require"
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
```

---

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start production server |
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npx prisma generate` | Regenerate Prisma client |
| `npx prisma db push` | Push schema changes to database |
| `npx prisma migrate dev` | Create a migration |
| `npx prisma studio` | Open Prisma Studio (database GUI) |

---

## API Endpoints

### Authentication

| Method | Endpoint | Description | Auth | Body |
|--------|----------|-------------|------|------|
| `POST` | `/api/v1/auth/sign-up` | Register new user | No | `{ name, email, password }` |
| `POST` | `/api/v1/auth/sign-in` | Login | No | `{ email, password }` |
| `POST` | `/api/v1/auth/sign-out` | Logout | No | — |

### Users

| Method | Endpoint | Description | Auth | Body |
|--------|----------|-------------|------|------|
| `GET` | `/api/v1/users` | List all users | No | — |
| `GET` | `/api/v1/users/:id` | Get user by ID | Yes | — |
| `POST` | `/api/v1/users` | Create user | No | `{ name, email, password }` |
| `PUT` | `/api/v1/users/:id` | Update user | No | `{ name?, email? }` |
| `DELETE` | `/api/v1/users/:id` | Delete user | No | — |

### Subscriptions (all routes require auth)

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| `GET` | `/api/v1/subscriptions` | List all subscriptions | — |
| `GET` | `/api/v1/subscriptions/:id` | Get subscription details | — |
| `POST` | `/api/v1/subscriptions` | Create subscription | See below |
| `PUT` | `/api/v1/subscriptions/:id` | Update subscription | Partial fields |
| `DELETE` | `/api/v1/subscriptions/:id` | Delete subscription | — |
| `GET` | `/api/v1/subscriptions/user/:id` | Get user's subscriptions | — |
| `PUT` | `/api/v1/subscriptions/:id/cancel` | Cancel subscription | — |
| `GET` | `/api/v1/subscriptions/upcoming-renewals` | Get renewals in next 30 days | — |

**Create Subscription body:**
```json
{
  "name": "Netflix",
  "price": 15.99,
  "currency": "USD",
  "frequency": "monthly",
  "category": "entertainment",
  "paymentMethod": "credit card",
  "startDate": "2024-01-15"
}
```

**Valid currencies:** `USD`, `EUR`, `GBP`, `GHS`
**Valid frequencies:** `daily`, `weekly`, `monthly`, `yearly`
**Valid categories:** `business`, `entertainment`, `fitness`, `food`, `health`, `sports`, `technology`, `travel`, `other`

---

## Request Validation

All request bodies are validated with Zod. Invalid requests return:

```json
{
  "success": false,
  "error": "Validation failed",
  "details": {
    "email": ["Invalid email address"],
    "password": ["Password must be at least 6 characters"]
  }
}
```

---

## Database Schema

### Users

```sql
CREATE TABLE users (
  id        TEXT PRIMARY KEY DEFAULT cuid(),
  name      TEXT NOT NULL,
  email     TEXT UNIQUE NOT NULL,
  password  TEXT NOT NULL,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP
);
```

### Subscriptions

```sql
CREATE TABLE subscriptions (
  id            TEXT PRIMARY KEY DEFAULT cuid(),
  name          TEXT NOT NULL,
  price         DOUBLE PRECISION NOT NULL,
  currency      TEXT DEFAULT 'USD',
  frequency     TEXT DEFAULT 'monthly',
  category      TEXT NOT NULL,
  paymentMethod TEXT NOT NULL,
  status        TEXT DEFAULT 'active',
  startDate     TIMESTAMP NOT NULL,
  renewalDate   TIMESTAMP NOT NULL,
  createdAt     TIMESTAMP DEFAULT NOW(),
  updatedAt     TIMESTAMP,
  userId        TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE
);
```

---

## Project Structure

```
sub_tracker/
├── app.ts                              # Express app entry point
├── tsconfig.json                       # TypeScript configuration
├── prisma/
│   └── schema.prisma                   # Database schema
├── generated/
│   └── prisma/                         # Generated Prisma client
├── config/
│   └── env.ts                          # Environment variable loader
├── database/
│   └── prisma.ts                       # Prisma client singleton
├── controllers/
│   ├── auth.controller.ts              # Auth logic (sign-up, sign-in, sign-out)
│   ├── user.controller.ts              # User CRUD logic
│   └── subscription.controller.ts      # Subscription CRUD + cancel + renewals
├── middlewares/
│   ├── auth.middleware.ts               # JWT authorization
│   ├── error.middleware.ts              # Error handling (Prisma errors)
│   └── validate.middleware.ts           # Zod validation middleware
├── validations/
│   └── index.ts                        # Zod schemas (auth, subscription, user)
├── routes/
│   ├── auth.routes.ts                  # Auth routes
│   ├── user.routes.ts                  # User routes
│   └── subscription.routes.ts          # Subscription routes
└── types/
    └── index.ts                        # Custom TypeScript types (AuthRequest)
```

---

## Features

- **Input validation** — All request bodies validated with Zod schemas
- **Password excluded** — Auth responses never return hashed passwords
- **Ownership checks** — Users can only update/delete their own subscriptions
- **Auto-renewal dates** — Computed from frequency when not provided
- **Upcoming renewals** — Query subscriptions renewing in the next 30 days
- **Request logging** — Morgan middleware for HTTP request logs
- **Prisma error handling** — Maps Prisma error codes to proper HTTP responses

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

This project is licensed under the MIT License.

---

**Bug Reports**: [GitHub Issues](https://github.com/hollali/sub_tracker/issues)
