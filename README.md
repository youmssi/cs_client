# CS Client - MRVIN100 Frontend

Next.js frontend application for MRVIN100, built with TypeScript and shadcn/ui.

## Features

- ✅ **Type-Safe**: Full TypeScript support with proper Strapi CMS types
- ✅ **SSG/ISR**: Static Site Generation with Incremental Static Regeneration
- ✅ **Component-Based**: Reusable components from shadcn/ui
- ✅ **Dynamic Zones**: Flexible content management via Strapi dynamic zones
- ✅ **Best Practices**: Follows Next.js 16 best practices and patterns

## Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **CMS**: Strapi 5

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (or npm/yarn)
- Strapi CMS running at `http://localhost:1337`

### Installation

1. Install dependencies:

```bash
pnpm install
# or
npm install
# or
yarn install
```

2. Copy environment variables:

```bash
cp .env.example .env.local
```

3. Update `.env.local` with your Strapi API URL:

```env
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337/api
```

4. Run the development server:

```bash
pnpm dev
# or
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
cs_client/
├── app/                    # Next.js app directory
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page (SSG/ISR)
├── components/
│   ├── dynamic-zone/       # Dynamic zone components
│   │   ├── manager.tsx     # Dynamic zone manager
│   │   ├── hero.tsx        # Hero section
│   │   ├── feature.tsx     # Feature cards
│   │   ├── how-it-work.tsx # How it works steps
│   │   ├── testimonials.tsx # Testimonials with card stack
│   │   ├── faq.tsx         # FAQ accordion
│   │   └── cta.tsx         # Call to action
│   └── ui/                 # shadcn/ui components
├── lib/
│   └── strapi.ts           # Strapi API client
└── types/
    └── strapi.ts           # TypeScript types for Strapi
```

## Architecture

### Type Safety

All Strapi data is fully typed using TypeScript interfaces defined in `types/strapi.ts`. No `any` types - everything is properly typed with `unknown` where needed.

### Data Fetching

- **SSG (Static Site Generation)**: Home page is statically generated at build time
- **ISR (Incremental Static Regeneration)**: Revalidates every hour (`revalidate: 3600`)
- **Client-Side**: Dynamic zones use client components where needed for interactivity

### Component Patterns

1. **Server Components**: Default - for static content and data fetching
2. **Client Components**: Marked with `'use client'` - for interactivity and animations
3. **Dynamic Imports**: Lazy loading for better performance
4. **Suspense**: Proper loading states for async components

### Dynamic Zones

The `DynamicZoneManager` component maps Strapi dynamic zone components to React components:

- `dynamic-zone.hero` → `<Hero />`
- `dynamic-zone.feature` → `<Feature />`
- `dynamic-zone.how-it-work` → `<HowItWork />`
- `dynamic-zone.testimonial` → `<Testimonials />`
- `dynamic-zone.faq` → `<FAQ />`
- `dynamic-zone.cta` → `<CTA />`

## Strapi CMS Integration

The application fetches data from Strapi CMS using the API client in `lib/strapi.ts`:

- **Global Settings**: `strapiClient.getGlobal()`
- **Blog Page**: `strapiClient.getBlogPage()`
- **Related Data**: `strapiClient.getFAQs()`, `strapiClient.getTestimonials()`, etc.

### Data Population

The home page automatically:
1. Fetches blog page data from Strapi
2. Extracts testimonial and FAQ IDs from dynamic zones
3. Fetches related data in parallel
4. Passes enriched data to components

## Components

### shadcn/ui

All components from `components/ui/` are reusable shadcn/ui components:
- Button, Card, Accordion, Avatar, Badge, etc.

## Environment Variables

```env
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337/api
```

## Build

```bash
pnpm build
```

## Production

```bash
pnpm start
```

## Code Quality

- **TypeScript**: Strict mode enabled
- **ESLint**: Next.js ESLint configuration
- **No `any` types**: All types properly defined
- **DRY**: Reusable components and utilities

## Best Practices

✅ Server Components by default  
✅ Client Components only when needed  
✅ Type-safe API calls  
✅ Proper error handling  
✅ Loading states with Suspense  
✅ ISR for performance  
✅ Dynamic imports for code splitting  
✅ Accessible components (ARIA labels, semantic HTML)

## License

MIT
