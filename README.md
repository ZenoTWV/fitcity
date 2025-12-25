# FitCity Culemborg Website

Marketing site for FitCity Culemborg built with React, Vite, Tailwind, Framer Motion, and React Router. Pages cover the homepage, memberships, Ladies Only, Kickboksen, Contact, and legal content.

## Getting Started
- Requirements: Node 18+ and npm.
- Install: `npm install`
- Develop: `npm run dev` (Vite dev server, defaults to http://localhost:5173)
- Build: `npm run build` (outputs to `dist/`)
- Preview production build: `npm run preview`

## Quality Checks
- `npm run lint` - ESLint across the project.
- `npm run validate:memberships` - ensures `src/data/memberships.js` has complete pricing data and referenced plans.
- `npm run validate:anchors` - ensures the `speciale-openingstijden` anchor exists on Contact only and the footer links to `/contact#speciale-openingstijden`.

## Project Structure
```
src/
  components/        # Shared UI (Navbar, Footer, AnimatedPage, etc.)
  data/              # Membership, CTA, site meta, and kickboxing content
  pages/             # Home, Pricing, LadiesOnly, Kickboksen, Contact, legal pages
  assets/            # Static visuals referenced by components
public/              # Public assets (favicons, hero images)
scripts/             # Validation scripts for anchors and memberships
```

## Content Notes
- Pricing & memberships: `src/data/memberships.js`. Keep plan fields populated (`id`, `name`, `price` or `priceText`, `description`, `features`) and ensure referenced plans exist; run `npm run validate:memberships` after edits.
- Kickboxing content: `src/data/kickboxingInfo.js` feeds the Kickboksen page.
- Navigation/contact metadata: `src/data/siteMeta.js`; CTA labels: `src/data/ctaConfig.js`.
- Background and typography are configured in `src/index.css` with Tailwind and Google Fonts.

## Deployment & Hosting
`npm run build` outputs static assets in `dist/`.
- Host `dist/` on any static provider (Nginx, Apache, Netlify, Vercel, S3/CloudFront, Azure Static, etc.).
- Because routing is client-side (React Router), add a single-page fallback so unknown paths serve `index.html` (e.g., Nginx `try_files $uri /index.html;`, Netlify `_redirects` with `/* /index.html 200`, Vercel `vercel.json` rewrite to `/`).
