# Jared Stoddard Portfolio

Client-side React Router app built with Vite and TailwindCSS, written in JavaScript (no TypeScript).

## Available scripts
- `npm run dev` — start the Vite dev server with HMR.
- `npm run build` — build the production bundle.
- `npm run preview` — preview the production build locally.

## Project structure
- `index.html` — Vite entry HTML with global metadata and font links.
- `app/main.jsx` — application entry that mounts the router.
- `app/router.jsx` — standard React Router config using `createBrowserRouter`.
- `app/pages/Home.jsx` — home route that renders the portfolio.
- `app/pages/PortfolioPageV2.jsx` — alternate portfolio layout available at `/v2`.
- `app/components/PortfolioPage.jsx` — main portfolio layout and content.

## Styling
TailwindCSS 4 is enabled via `app/app.css`; extend the theme there as needed.
