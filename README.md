# Solvro Cocktails

A web app for browsing cocktails, built as the recruitment task for the **KN Solvro** Frontend section.
Data comes from the [Solvro Cocktails API](https://cocktails.solvro.pl).

**Live demo:** https://solvro-cocktails-app.vercel.app

## Features

- Cocktail list with images, category and alcoholic / non-alcoholic label
- Search by name (debounced, server-side `name=%…%` filter)
- Filter: all / alcoholic / non-alcoholic (server-side)
- Pagination based on the API `meta` (each page cached separately)
- Cocktail details page (`/cocktails/[id]`) with glass, instructions and **ingredients with measures**
- Favorites – add / remove cocktails, saved in `localStorage` (survives page refresh)
- Loading and error states
- Responsive, mobile-first grid

## Tech stack

| | |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | TypeScript |
| Server state | [TanStack Query](https://tanstack.com/query) |
| Client state | [Jotai](https://jotai.org) |
| UI | [shadcn/ui](https://ui.shadcn.com) + Tailwind CSS 4 |
| Deployment | Vercel |

## Technical decisions

- **TanStack Query instead of `useEffect` + `useState`** – caching, loading/error states and request deduplication out of the box. The page number is part of the `queryKey`, so changing the page fetches new data and going back is instant.
- **Typed API layer** (`lib/api.ts`) – generic `PaginatedResponse<T>` for list endpoints and a separate response type for a single cocktail, so components never work with `any`.
- **Server page + client component** – `app/cocktails/[id]/page.tsx` only wraps the client `CocktailDetails` component in `<Suspense>`, which reads the route param with `useParams` and fetches data with TanStack Query.
- **Favorites with Jotai `atomWithStorage`** – a global atom holding an array of cocktail ids, persisted in `localStorage`; updated immutably (`filter` / spread) so React re-renders correctly.
- **Filters as part of the `queryKey`** – search text (debounced 300 ms with a small `useDebouncedValue` hook), type filter and page live in Jotai atoms; changing any of them creates a new query key, so TanStack Query fetches and caches each combination. Changing a filter resets the page to 1.
- **List fetches no ingredients** – ingredients are loaded only on the details page, so the list needs a single request per page.

## Project structure

```
app/
  page.tsx               # home page – cocktail list
  cocktails/[id]/page.tsx  # details page
  providers.tsx          # TanStack Query provider
components/
  cocktail-list.tsx
  cocktail-details.tsx
  header.tsx
  types.ts               # API types
  ui/                    # shadcn/ui components
hooks/
  use-debounced-value.ts # debounce hook for search
lib/
  api.ts                 # API fetchers
  atoms.ts               # Jotai atoms (favourites, search, filter, page)
```

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Author

Mikołaj Michalak – [GitHub](https://github.com/Majkan1) · [mikolajmichalak.dev](https://mikolajmichalak.dev)
