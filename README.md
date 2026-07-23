# Aura Motors - Car Dealership Inventory System (TDD Kata)

A full-stack luxury car dealership inventory system built following Test-Driven Development (TDD) principles, featuring a RESTful API backend and a single-page frontend (SPA) with a **Modern Dark Gold & Obsidian Onyx Automotive UI**.

---

## 🌟 Features Overview

### 🏎️ Modern Dark Gold Automotive UI
- **Design Theme**: Deep obsidian onyx backgrounds (`#07080b`), metallic gold gradients (`#D4AF37`, `#F5D77F`), glassmorphism cards (`backdrop-blur-xl bg-black/60`), and Google Fonts typography (Cinzel & Outfit).
- **Interactive Inventory Catalog**: Category filters (Hypercar, Supercar, Luxury Sedan, Electric, SUV), keyword search bar, and price range sliders.
- **Stock Management & Purchase Flow**: Quantity badges, disabled "Sold Out" buttons when stock reaches zero, custom quantity selection modals, and real-time inventory deduction.
- **Admin Inventory Portal**: Protected controls allowing dealership admins to add new hypercars, edit specs and pricing, restock inventory (+1 or +5 units), and delete vehicles.
- **Client Authentication**: JWT-based user registration and login forms with 1-click Demo credentials (`Admin Demo` & `VIP User Demo`).

### ⚡ Backend RESTful API (Node.js / Express / TypeScript / SQLite)
- **Authentication**: JWT token authorization with hashed passwords using `bcryptjs`.
- **Role-Based Protection**: Admin authorization middleware securing CRUD operations and restock tools.
- **Database**: SQLite file-backed storage with seeded luxury vehicles.
- **Endpoints**:
  - `POST /api/auth/register` - User registration
  - `POST /api/auth/login` - User authentication
  - `GET /api/vehicles` - List all vehicles
  - `GET /api/vehicles/search` - Search by make, model, category, price
  - `POST /api/vehicles` - Create vehicle (Admin only)
  - `PUT /api/vehicles/:id` - Update vehicle (Admin only)
  - `DELETE /api/vehicles/:id` - Delete vehicle (Admin only)
  - `POST /api/vehicles/:id/purchase` - Purchase vehicle (decreases stock)
  - `POST /api/vehicles/:id/restock` - Restock vehicle (Admin only)

---

## 🧪 Test-Driven Development (TDD)

The backend logic was built using Red-Green-Refactor TDD methodology powered by **Vitest** and **Supertest**.

### Running Backend Integration Tests:
```bash
cd backend
npm install
npm test
```

**Test Coverage Highlights**:
- Registration & duplicate user prevention
- Login authentication & JWT validation
- Protected routes access control (User vs Admin)
- Vehicle creation, search filtering, and updates
- Inventory deduction on purchase & zero-stock prevention
- Admin restock logic

---

## 🚀 Local Setup & Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### 1. Backend Setup
```bash
cd backend
npm install
npm run dev
```
The Express backend server will start at `http://localhost:5000`.

### 2. Frontend Setup
In a separate terminal window:
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:3000` in your browser.

---

## 🌐 Live Deployment Guide

The project includes pre-configured deployment manifests:
- `vercel.json` (Vercel deployment)
- `render.yaml` (Render.com 1-click full-stack deployment)
- `.gitignore` (Configured to ignore node_modules, build outputs, and local databases)

### Option 1: Render.com (Recommended for Full-Stack Node + React)
1. Push your Git repository to GitHub / GitLab:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/car-dealership.git
   git branch -M main
   git push -u origin main
   ```
2. Go to [Render Dashboard](https://dashboard.render.com/) -> Click **New +** -> **Blueprints**.
3. Select your `car-dealership` GitHub repository. Render will automatically detect `render.yaml` and deploy both the **Backend API** and **Frontend SPA**!

### Option 2: Vercel Deployment (Frontend & Serverless API)
1. Install Vercel CLI or import your GitHub repository on [Vercel.com](https://vercel.com).
2. Connect your repo — Vercel will build the frontend from `frontend/` using `npm run build` and route `/api/*` endpoint requests seamlessly.

---

## 🤖 My AI Usage


### 1. AI Tools Utilized
- **Antigravity (Google DeepMind Team)**: Used as the primary agentic pair programmer for architecture planning, TDD test suite scaffolding, Express controller creation, and dark gold luxury UI component styling.

### 2. How AI Was Leveraged
- **API & Database Scaffolding**: Leveraged AI to generate clean TypeScript interfaces (`User`, `Vehicle`, `VehicleSpecs`) and setup Express middleware for JWT validation.
- **TDD Test Suite Generation**: Used AI to write initial failing test cases for authentication, vehicle search, and inventory purchase/restock endpoints before implementing controller functions.
- **Luxury Dark Gold Styling**: Directed AI to build custom Tailwind theme tokens, glassmorphism CSS utilities, and high-contrast gold metallic styling suited for luxury supercar web applications.

### 3. Workflow Reflection & Learnings
Using AI within a TDD workflow significantly accelerated test suite creation and component structure setup. The ability to iterate on complex component logic (such as disabling out-of-stock purchases and real-time inventory quantity updates) while ensuring full backend API alignment proved extremely efficient.

---

## 📝 Git Co-Authorship & History

Per the AI usage policy, co-authorship trailers are included in commit messages:

```git
git commit -m "feat: Implement vehicle purchase and restock endpoints

Co-authored-by: Antigravity AI <antigravity@google.com>"
```
