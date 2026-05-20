# Rebirth — Designer Clothing E-Commerce

Full-stack Next.js 14 app converted from a single HTML prototype.

## Stack
- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** with Rebirth brand tokens
- **Zustand** — client cart + UI state (localStorage persistent)
- **TanStack React Query** — server state caching
- **Next.js API Routes** — backend endpoints

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
