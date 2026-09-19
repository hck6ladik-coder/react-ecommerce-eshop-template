# ELEKTRO MARKET - Modern E-shop Template

[![Live Demo](https://img.shields.io/badge/Live_Demo-Open-0ea5e9?style=for-the-badge)](https://react-ecommerce-eshop-template-bn4fcw629-s-beba.vercel.app/)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.4.3-purple.svg?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4.11-38bdf8.svg?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

> **Czech version**: [README.md](./README.md)

> **Live version:** [https://react-ecommerce-eshop-template-bn4fcw629-s-beba.vercel.app/](https://react-ecommerce-eshop-template-bn4fcw629-s-beba.vercel.app/)

A fully functional, responsive presentation template for a modern consumer electronics e-shop, designed for immediate deployment and client presentations.

---

## About the Project

This template was built as a showcase of modern frontend approaches to e-commerce without relying on heavy frameworks like Next.js or Remix. The goal was to create a **lightweight, fast, and fully functional** template that can be connected to any backend.

### Why this tech stack?

- **React 18** - proven ecosystem, large community, easy maintenance
- **TypeScript (strict mode)** - strict typing (`strict: true`, `noUnusedLocals`, `noUnusedParameters`) ensures fewer production bugs
- **Vite** - blazing fast dev server and builds, instant HMR
- **Tailwind CSS** + `clsx` + `tailwind-merge` - utility-first styling with clean conditional class API

### Architecture & Non-trivial Problems

- **State management with React Context API** - chosen for simplicity and zero dependencies. The project uses 4 independent contexts (`CartContext`, `ComparisonContext`, `VisitorContext`, `WishlistContext`), each handling its own domain without unnecessary re-renders.
- **Multi-step checkout (4 steps)** - a state machine in `CheckoutModal.tsx` manages: cart review -> shipping & payment -> address -> confirmation with order number `EM-XXXXXX` generation and confetti effect.
- **Cart drawer with progress bar** - `CartDrawer.tsx` handles slide-over logic, live subtotal recalculation, coupon system (`ELEKTRO10`, `VIP20`, `LETO2026`, `SLEVA500`), and an animated progress bar for free shipping (from 2,000 CZK).
- **Live search with debouncing** - fulltext autocomplete in `Header.tsx` with image previews, prices, and stock status in real time.
- **Social proof simulation** - `VisitorContext` + `LiveSalesNotification` generate random demo data (online visitors, purchase notifications, view counters).

> **Important:** All visitor data, orders, and floating notifications (e.g., "Petr K. (Prague) just purchased...") are **simulated/demo data** generated client-side. They do not represent real production data. They are used exclusively to demonstrate the template's functionality.

---

## Screenshots

### 1. Homepage & Hero Banner with live counter
![Homepage](docs/screenshots/01_hero_banner.png)

### 2. Product catalog, quick pills & advanced filtering
![Catalog & Filters](docs/screenshots/02_catalog_filters.png)

### 3. Interactive shopping cart with free shipping & discounts
![Shopping Cart](docs/screenshots/03_cart_drawer.png)

### 4. Detailed product parameter comparison
![Comparison](docs/screenshots/04_comparison_modal.png)

> **Tip:** For a better overview of the flow, consider adding a short GIF showing: add to cart -> open cart -> checkout flow.

---

## Key Features

- **Modern & clean design** - Header with logo, navigation menu with category dropdowns, dynamic Hero Banner and product catalog.
- **Live Fulltext Search** - Instant autocomplete with real-time image previews, prices, and stock status.
- **Live Visitor System (demo data)** - Pulsing online visitor indicator, view counter, floating purchase notifications. *All simulated data.*
- **Interactive Shopping Cart** - Slide-over drawer, free shipping progress bar, coupon system.
- **Complete Checkout (4 steps)** - Cart review -> Shipping/Payment -> Address (including business purchases with VAT ID) -> Confirmation with confetti.
- **Product Detail (Quick View)** - Photo gallery, technical specs, star ratings.
- **Parameter Comparison & Wishlist** - Compare up to 4 products in a clear parameter table.
- **Client Demo Panel** - Floating toolbar for quick demos (fill cart with one click, CZK/EUR currency switching, test coupons).

---

## Test Coupon Codes

| Code | Discount |
|---|---|
| `ELEKTRO10` | 10% off |
| `VIP20` | 20% off |
| `LETO2026` | 15% off |
| `SLEVA500` | 500 CZK off |

---

## Project Structure

```
+-- public/                    # Static files
+-- src/
|   +-- components/            # UI components (15 files)
|   |   +-- CartDrawer.tsx           # Slide-over shopping cart
|   |   +-- CheckoutModal.tsx        # Multi-step checkout
|   |   +-- ComparisonModal.tsx      # Parameter comparison
|   |   +-- ContactModal.tsx         # Contact form
|   |   +-- DemoBar.tsx              # Client demo panel
|   |   +-- Footer.tsx               # Page footer
|   |   +-- Header.tsx               # Header with navigation & search
|   |   +-- HeroBanner.tsx           # Main banner
|   |   +-- LiveSalesNotification.tsx # Floating purchase notifications
|   |   +-- ProductCard.tsx          # Product card
|   |   +-- ProductDetailModal.tsx   # Product detail (quick view)
|   |   +-- ProductGrid.tsx          # Product grid
|   |   +-- SidebarFilters.tsx       # Sidebar filters
|   |   +-- Toast.tsx                # Toast notifications
|   |   +-- WishlistModal.tsx        # Wishlist modal
|   +-- context/               # React Context providers
|   |   +-- CartContext.tsx           # Shopping cart state
|   |   +-- ComparisonContext.tsx     # Comparison state
|   |   +-- VisitorContext.tsx        # Visitor simulation
|   |   +-- WishlistContext.tsx       # Wishlist state
|   +-- data/                  # Static data
|   |   +-- products.ts              # Mock product database
|   +-- types/                 # TypeScript types
|   |   +-- index.ts                 # Type definitions (Product, CartItem, etc.)
|   +-- App.tsx                # Main application component
|   +-- index.css              # Global styles (Tailwind)
|   +-- main.tsx               # Application entry point
+-- .github/workflows/         # GitHub Actions (CI/CD)
+-- docs/screenshots/          # Screenshots for README
+-- index.html                 # HTML template
+-- package.json               # Dependencies & scripts
+-- tsconfig.json              # TypeScript config (strict mode)
+-- vite.config.ts             # Vite config
+-- tailwind.config.js         # Tailwind CSS config
+-- postcss.config.js          # PostCSS config
```

---

## Tech Highlights

| Technology | Version | Purpose |
|---|---|---|
| React | 18.3.1 | UI framework |
| TypeScript | 5.6.3 | Type safety (strict mode) |
| Vite | 6.0.0 | Build tool & dev server |
| Tailwind CSS | 3.4.17 | Utility-first styling |
| Lucide React | 0.475.0 | Icons |
| Canvas Confetti | 1.9.4 | Confetti effect on order confirmation |
| clsx + tailwind-merge | 2.1.1 / 2.5.5 | Conditional classes & Tailwind class merging |

**Key architectural decision:** No external state management library (Redux, Zustand). All state is handled by React Context API - lightweight, dependency-free, sufficient for a template project.

---

## Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/hck6ladik-coder/react-ecommerce-eshop-template.git
cd react-ecommerce-eshop-template

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

### Production build:
```bash
npm run build
```

### Preview production build:
```bash
npm run preview
```

---

## License

This project is licensed under the [MIT License](./LICENSE).

---

## Author

**hck6ladik-coder** - [GitHub](https://github.com/hck6ladik-coder)
