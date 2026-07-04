# Beleqet - Hiring & Freelance Platform

A complete, production-ready hiring and freelance platform built with modern technologies.

## 🚀 Features

- **Backend**: NestJS + PostgreSQL + Prisma + Redis (BullMQ queues)
- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **AI-powered candidate screening** using OpenAI
- **Escrow payments** with Chapa integration
- **Real-time chat**
- **Telegram notifications**
- **Role-based access control** (Admin, Employer, Job Seeker, Freelancer)

## 📦 Project Structure

```
beleqet-interview-task/
├── backend/              # NestJS API
├── beleqet-jobs-nextjs/  # Next.js Frontend
└── Beleqet_System_Architecture.docx
```

## 🛠️ Quick Start Guide

### Prerequisites

- Node.js 18+
- Docker & Docker Compose (for PostgreSQL and Redis)
- npm or yarn

---

### Step 1: Start Database & Redis

First, start PostgreSQL and Redis using Docker:

```bash
cd backend
docker-compose up -d db redis
```

---

### Step 2: Set up Backend

```bash
cd backend

# Install dependencies (if not already installed)
npm install

# Set up environment variables (already done for you)
# .env file is ready with development defaults

# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed demo data
npm run prisma:seed

# Start the backend server
npm run start:dev
```

The backend will be available at:
- API: http://localhost:4000/api/v1
- Swagger Docs: http://localhost:4000/api/docs

---

### Step 3: Set up Frontend

```bash
cd beleqet-jobs-nextjs

# Install dependencies
npm install

# Set up environment variables (already done for you)
# .env.local is ready

# Start the frontend server
npm run dev
```

The frontend will be available at:
- http://localhost:3000

---

## 📚 API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - Logout user
- `GET /auth/me` - Get current user

### Jobs
- `GET /jobs` - Browse/search job listings (public)
- `GET /jobs/categories` - Get all job categories
- `GET /jobs/:id` - Get job details (public)
- `POST /jobs` - Create job listing (employer only)
- `PATCH /jobs/:id` - Update job listing (employer only)
- `DELETE /jobs/:id` - Delete job listing (employer only)

### Applications
- `POST /applications` - Submit job application (triggers AI screening)
- `GET /applications/my` - Get user's applications
- `GET /applications/job/:id` - Get applications for a job (employer only)
- `GET /applications/:id` - Get application details
- `PATCH /applications/:id/status` - Update application status (employer only)

And many more! See Swagger docs at http://localhost:4000/api/docs for complete API reference.

---

## 🎨 Design

The frontend follows the design system from the Beleqet design process document, with:
- Brand green as primary color
- Clean, modern interface
- Mobile-first responsive design

---

## 🔧 Configuration

### Backend Environment Variables

Key variables (see `backend/.env` for full list):
- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_HOST` / `REDIS_PORT` - Redis connection
- `JWT_ACCESS_SECRET` - Secret for JWT tokens
- `OPENAI_API_KEY` - OpenAI API key for AI screening
- `TELEGRAM_BOT_TOKEN` - Telegram bot token for notifications
- `CHAPA_SECRET_KEY` - Chapa payment secret key

### Frontend Environment Variables

Key variables (see `beleqet-jobs-nextjs/.env.local`):
- `NEXT_PUBLIC_API_URL` - Backend API URL (default: http://localhost:4000/api/v1)

---

## 📝 License

This project is part of the Beleqet ecosystem.
