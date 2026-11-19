# Rebirth — Designer Streetwear E-Commerce & AI Virtual Try-On

![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=flat&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Brand_Tokens-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Zustand](https://img.shields.io/badge/State-Zustand-443E38?style=flat)
![React Query](https://img.shields.io/badge/Data-TanStack_Query-FF4154?style=flat&logo=reactquery&logoColor=white)
![AI Try-On](https://img.shields.io/badge/Feature-AI_Virtual_Try--On-10B981?style=flat)

## Description

**Rebirth** redefines the streetwear e-commerce experience by integrating artificial intelligence and user-identity-centered design. Built as a full-stack **Next.js 14** application, it features a dynamic catalog with multi-column grid views, persistent shopping cart management, RESTful API endpoints, and an **AI Virtual Try-On** module that lets users preview garments before purchasing.

## Author

| Contributor | Role / Focus |
| :--- | :--- |
| Juan Pablo Valbuena | `Full-Stack Architecture, UI/UX Design Tokens & AI Virtual Try-On` |

## Tech Stack & Architecture

* **Next.js 14 (App Router & TypeScript):** Server-side rendering, dynamic routing, and integrated backend API routes.
* **Tailwind CSS:** Custom design system configured with Rebirth brand tokens and Google Fonts (`Cinzel`, `UnifrakturMaguntia`, and `Sofia Sans`).
* **Zustand:** Lightweight client-side state management with `localStorage` persistence for the shopping cart and UI view modes.
* **TanStack React Query:** Asynchronous server state caching and synchronization.
* **AI Virtual Try-On (`/try-on`):** Interactive garment fitting workflow (`upload → simulate → result`).****
# Rebirth — Designer Clothing E-Commerce

Full-stack Next.js 14 app converted from a single HTML prototype.

## Project Structure
```
src/
├── app/
│   ├── page.tsx              # Home (splash, hero, most wanted, lookbook)
│   ├── shop/page.tsx         # Shop grid with filter bar (3/4/6 col view modes)
│   ├── product/[id]/page.tsx # Product detail (size, qty, add to cart, try-on link)
│   ├── checkout/page.tsx     # Checkout (cart, shipping, payment, order)
│   ├── login/page.tsx        # Login
│   ├── signup/page.tsx       # Sign-up
│   ├── try-on/page.tsx       # Virtual Try-On (upload → simulate → result)
│   └── api/
│       ├── products/route.ts       # GET  — list products with filters
│       ├── products/[id]/route.ts  # GET  — single product + related
│       ├── cart/route.ts           # POST/DELETE — server-side cart ops
│       ├── orders/route.ts         # POST — place order | GET — history
│       └── auth/route.ts           # POST — login | signup | validateDiscount
├── components/
│   ├── Providers.tsx         # QueryClient + Toast wrapper
│   ├── layout/               # Navbar, Footer
│   ├── product/              # ProductCard, ProductGrid, FilterBar
│   └── ui/                   # Toast
├── store/
│   ├── cart.store.ts         # Zustand cart (persisted)
│   └── ui.store.ts           # view mode, filter, toast
├── lib/
│   └── products.ts           # Product data (move to DB when ready)
└── types/index.ts            # Shared TypeScript types
```

## Quick Start

```bash
npm install
npm run dev
# → http://localhost:3000
```

## API Endpoints

| Method | Path                    | Description                        |
|--------|-------------------------|------------------------------------|
| GET    | /api/products           | List products (supports filters)   |
| GET    | /api/products/:id       | Product detail + related           |
| POST   | /api/cart               | Validate cart item (stock check)   |
| DELETE | /api/cart               | Remove cart item                   |
| POST   | /api/orders             | Place order                        |
| GET    | /api/orders             | Order history                      |
| POST   | /api/auth               | Login / Sign-up / Validate discount|

### Query params for /api/products
- `category` — Camisetas | Hoodies
- `size` — S | M | L | XL
- `minPrice` / `maxPrice`
- `featured=true` — Most Wanted (top 3)
- `limit`

## Discount Codes
- `REBIRTH10` — 10% off
- `WELCOME10` — 10% off

## Fonts
Loaded via Google Fonts in `layout.tsx`:
- **Cinzel** — headings, labels, buttons
- **UnifrakturMaguntia** — brand logo, splash
- **Sofia Sans** — body copy

## Next Steps
1. Connect Prisma + Neon PostgreSQL (schema in Phase 2 of the architecture doc)
2. Replace `src/lib/products.ts` with real DB queries in API routes
3. Add NextAuth.js v5 for real authentication
4. Add Cloudinary for product image uploads
5. Integrate Python FastAPI + Vertex AI for real Virtual Try-On
