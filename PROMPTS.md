# PROMPTS.md - AI Interaction & Co-Authorship History

This file logs the chat prompts and instructions used with AI tools during the development of the Car Dealership Inventory System.

---

## Session 1: Requirements Analysis & Architecture Planning
**User Prompt**:
> "i want to create project which i upload a requirments can you do"
> "design for ui is modern dark gold and suitable for car or vehical website ui"
> Attachment: `TDD Kata: Car Dealership Inventory System PDF`

**AI Assistant Action**:
- Analyzed the core requirements for Node.js REST API, SQLite database, TDD test suite with Vitest/Supertest, and React single-page app with Tailwind CSS.
- Created `implementation_plan.md` defining the **Aura Motors** modern dark gold luxury automotive theme (`#07080b` obsidian background, `#D4AF37` gold accents, glassmorphic panels).

---

## Session 2: TDD Backend RESTful API Development
**User Prompt**:
> "create a project of this"

**AI Assistant Action**:
- Initialized Express TypeScript backend structure in `backend/`.
- Created database layer `src/config/db.ts` with seeded hypercars (Aura Monarch Gold, Lucid Air Sapphire Gold, Phantom Apex Sovereign V12, Vanguard Goldstorm GT, Titan Cullinan Gold).
- Built JWT authentication controllers and middlewares in `src/controllers/authController.ts` & `src/middleware/auth.ts`.
- Built vehicle search & CRUD controllers in `src/controllers/vehicleController.ts`.
- Built purchase & restock inventory controllers in `src/controllers/inventoryController.ts`.
- Created TDD integration tests in `backend/tests/` using Vitest and Supertest covering Auth, Vehicle search/CRUD, and Inventory purchase/restock logic.

---

## Session 3: Modern Dark Gold Frontend SPA Implementation
**User Prompt**:
> "design for ui is modern dark gold and suitable for car or vehical website ui"

**AI Assistant Action**:
- Scaffolder React + Vite + Tailwind CSS frontend project in `frontend/`.
- Configured custom dark gold color tokens, metallic text gradients, and glassmorphism utilities in `tailwind.config.js` and `index.css`.
- Built responsive components:
  - `Navbar.jsx`: Logo, role mode switcher (Admin vs VIP User), user authentication modal trigger.
  - `Hero.jsx`: High-impact luxury hypercar banner, live specs counter, search bar.
  - `CategoryFilter.jsx`: Filters for Hypercar, Supercar, Luxury Sedan, Electric, SUV, price slider, and sorting.
  - `VehicleCard.jsx`: Specs badges, stock counter glow, disabled purchase button when out of stock, admin management menu.
  - `VehicleDetailModal.jsx`: Tech specs breakdown, custom quantity selection purchase flow, admin restock tool.
  - `AdminVehicleModal.jsx`: Form dialog for adding and updating vehicle specs and stock.
  - `AuthModal.jsx`: Register & Login form with 1-click Demo credentials.
  - `Toast.jsx`: Gold luxury concierge notification popups.
- Created `README.md` with setup guides and mandatory **"My AI Usage"** section.

---

## Co-Author Commit Header Format
```
Co-authored-by: Antigravity AI <antigravity@google.com>
```
