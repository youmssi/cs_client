# CS Client - MRVIN100 Frontend

A modern, high-performance Next.js 16 frontend application for MRVIN100, built with TypeScript, Tailwind CSS, and shadcn/ui. This client is powered by a Strapi 5 headless CMS (cs_cms).

## 🎯 Overview

**CS Client** is the customer-facing frontend for the MRVIN100 project, providing:

- ✅ **Type-Safe**: Full TypeScript support with Strapi CMS types
- ✅ **SSG/ISR**: Static Site Generation with Incremental Static Regeneration
- ✅ **Component-Based**: Reusable components from shadcn/ui
- ✅ **Dynamic Zones**: Flexible content management via Strapi dynamic zones
- ✅ **Multi-Language**: i18n support with locale routing
- ✅ **SEO Optimized**: Proper meta tags, structured data, sitemaps
- ✅ **Best Practices**: Follows Next.js 16 best practices and patterns
- ✅ **Performance**: Optimized images, code splitting, lazy loading

## 📋 Tech Stack

- **Framework**: Next.js 16.0.1
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui (Radix UI)
- **Animations**: Framer Motion 12
- **CMS**: Strapi 5 (cs_cms)
- **State Management**: TanStack React Query 5
- **RPC**: tRPC 11
- **Forms**: React Hook Form 7

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (recommended), npm, or yarn
- **Running Strapi CMS**: cs_cms must be running at `http://localhost:1337`

### Installation & Setup

#### 1. Install Dependencies

```bash
cd cs_client
pnpm install
# or
npm install
# or
yarn install
```

#### 2. Environment Configuration

Copy environment variables:

```bash
cp .env.example .env.local
```

Update `.env.local` with your Strapi CMS URL:

```env
# CMS Configuration
NEXT_PUBLIC_CMS_URL=http://localhost:1337

# Optional: Production CMS URL
NEXT_PUBLIC_CMS_URL_PRODUCTION=https://api.mrvin100.com

# Locales (i18n)
NEXT_PUBLIC_DEFAULT_LOCALE=en
NEXT_PUBLIC_LOCALES=en,fr,es,de

# Analytics (optional)
NEXT_PUBLIC_FORMBRICKS_SURVEY_ID=your_survey_id
NEXT_PUBLIC_FORMBRICKS_ENVIRONMENT_ID=your_environment_id
NEXT_PUBLIC_FORMBRICKS_API_HOST=https://app.formbricks.com

# API Routes
NEXT_PUBLIC_API_ROUTE=/api/trpc
```

#### 3. Start Strapi CMS (if not running)

In a separate terminal:

```bash
cd ../cs_cms
npm run dev
```

#### 4. Run Development Server

```bash
pnpm dev
# or
npm run dev
```

Access the application at: `http://localhost:3000`

#### 5. Open in Browser

- **Homepage**: `http://localhost:3000`
- **English**: `http://localhost:3000/en`
- **French**: `http://localhost:3000/fr`
- **Spanish**: `http://localhost:3000/es`

## 📁 Project Structure

```
cs_client/
├── app/                              # Next.js app directory
│   ├── favicon.ico
│   ├── globals.css                   # Global styles
│   ├── icon.png
│   ├── layout.tsx                    # Root layout
│   ├── not-found.tsx                 # 404 page
│   │
│   ├── [locale]/                     # Locale-based routing
│   │   ├── layout.tsx                # Locale layout
│   │   │
│   │   ├── (marketing)/              # Marketing pages group
│   │   │   ├── page.tsx              # Home page (SSG/ISR)
│   │   │   └── [slug]/               # Dynamic pages
│   │   │       └── page.tsx          # Dynamic page renderer
│   │   │
│   │   └── api/                      # Server API routes
│   │       ├── revalidate/           # ISR revalidation
│   │       └── trpc/                 # tRPC routes
│   │
│   └── api/                          # Root API routes
│       ├── revalidate/               # ISR revalidation endpoint
│       │   └── route.ts              # Handle revalidate requests
│       └── trpc/                     # tRPC API endpoint
│           └── [trpc]/
│               └── route.ts          # tRPC server router
│
├── components/                       # React components
│   ├── empty-state.tsx              # Empty state component
│   ├── layout-content.tsx           # Layout wrapper
│   ├── locale-link.tsx              # Locale-aware links
│   ├── locale-switcher.tsx          # Language switcher
│   ├── mode-toggle.tsx              # Dark/light theme toggle
│   ├── page-content.tsx             # Page content wrapper
│   ├── state-views.tsx              # Loading/error states
│   ├── theme-provider.tsx           # Theme configuration
│   │
│   ├── brillance/                   # MRVIN100 brand components
│   │   ├── badge.tsx                # Custom badge component
│   │   └── illustrations/           # SVG illustrations
│   │       ├── effortless-integration.tsx
│   │       ├── numbers-that-speak.tsx
│   │       ├── smart-simple-brilliant.tsx
│   │       └── your-work-in-sync.tsx
│   │
│   ├── dynamic-zone/                # Dynamic zone components (from Strapi)
│   │   ├── manager.tsx              # Dynamic zone renderer
│   │   ├── hero.tsx                 # Hero section
│   │   ├── dashboard-showcase.tsx   # Dashboard preview
│   │   ├── social-proof.tsx         # Logo grid/trust indicators
│   │   ├── bento-grid.tsx           # Feature grid layout
│   │   ├── platform-features.tsx    # Platform features
│   │   ├── pricing.tsx              # Pricing section
│   │   ├── testimonials.tsx         # Testimonials carousel
│   │   ├── faq.tsx                  # FAQ accordion
│   │   ├── cta.tsx                  # Call-to-action section
│   │   ├── story.tsx                # Rich text story block
│   │   ├── custom-budget.tsx        # Custom pricing component
│   │   └── dashboard-showcase.tsx   # Dashboard preview
│   │
│   ├── global/                      # Global layout components
│   │   ├── navbar.tsx               # Navigation bar
│   │   ├── footer.tsx               # Footer section
│   │   └── section-header.tsx       # Section header with badge
│   │
│   └── ui/                          # shadcn/ui components
│       ├── accordion.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── carousel.tsx
│       ├── form.tsx
│       ├── input.tsx
│       ├── select.tsx
│       ├── tabs.tsx
│       ├── tooltip.tsx
│       └── ... (40+ more UI components)
│
├── features/                        # Feature-based modules
│   └── cs/                          # Coming soon feature
│       ├── hooks/
│       │   └── use-coming-soon.ts  # Coming soon logic
│       ├── server/
│       │   ├── prefetch.ts         # Data prefetching
│       │   └── routers.ts          # API routers
│       └── params.ts               # Feature parameters
│
├── hooks/                          # Custom React hooks
│   └── use-mobile.ts              # Mobile detection hook
│
├── lib/                            # Utility functions & helpers
│   ├── constants.ts               # App constants
│   ├── env.client.ts              # Client environment variables
│   ├── env.server.ts              # Server environment variables
│   ├── formbricks.ts              # Formbricks integration
│   ├── i18n-config.ts             # i18n configuration
│   ├── media.strapi.ts            # Strapi media utilities
│   ├── metadata.ts                # Metadata helper functions
│   ├── static-params.ts           # Static parameters for routes
│   ├── utils.ts                   # General utilities
│   └── strapi.ts                  # Strapi API client (NOT IN THIS FOLDER)
│
├── providers/                      # Context providers
│   ├── app.provider.tsx           # App-wide providers
│   ├── formbricks.provider.tsx    # Formbricks analytics
│   └── index.ts                   # Provider exports
│
├── trpc/                          # tRPC configuration
│   ├── client.tsx                 # tRPC client
│   ├── init.ts                    # tRPC initialization
│   ├── query-client.ts            # React Query config
│   ├── server.tsx                 # tRPC server
│   └── routers/
│       └── _app.ts               # Root router
│
├── types/                         # TypeScript type definitions
│   ├── blocks.ts                  # Content block types
│   ├── components.ts              # Component types
│   ├── global.ts                  # Global types
│   ├── index.ts                   # Type exports
│   └── page.ts                    # Page types
│
├── public/                        # Static assets
│   ├── images/                    # Image assets
│   ├── icons/                     # Icon files
│   └── ... (various image files)
│
├── .github/
│   └── workflows/
│       └── nextjs.yml            # GitHub Actions CI/CD
│
├── components.json               # shadcn/ui config
├── eslint.config.mjs            # ESLint configuration
├── middleware.ts                # Next.js middleware
├── next.config.ts               # Next.js configuration
├── mprocs.yaml                  # Multi-process config
├── package.json
├── postcss.config.mjs           # PostCSS configuration
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json
├── .env.example
├── .dockerignore
└── Dockerfile
```

## 🏗️ Architecture

### Data Flow

```
Strapi CMS (cs_cms)
    ↓ (REST API)
Next.js Client (cs_client)
    ├── Build Time (SSG/ISR)
    │   ├── Fetch page from Strapi
    │   ├── Extract content & dynamic zones
    │   └── Generate static HTML
    │
    ├── Request Time (ISR Revalidation)
    │   ├── Check cache age
    │   ├── If stale, regenerate page
    │   └── Serve updated HTML
    │
    └── Runtime (Client-Side)
        ├── Interactive features
        ├── Form submissions
        └── Locale switching
```

### Rendering Strategies

1. **SSG (Static Site Generation)**
   - Homepage and marketing pages pre-rendered at build time
   - Fast delivery with CDN caching
   - Revalidation: Every hour (ISR)

2. **ISR (Incremental Static Regeneration)**
   - Automatic page regeneration on-demand
   - Triggered by API changes in CMS
   - Ensures fresh content without full rebuilds

3. **Dynamic Routes**
   - Pages from Strapi with `[slug]` parameter
   - Generated at build time and on-demand
   - Fallback for new pages

### Type Safety

All data from Strapi is fully typed:

```typescript
// Auto-generated from Strapi schema
import type { Page, PageContent } from '@/types'

export const getPage = async (slug: string): Promise<Page> => {
  // Fetch with full type safety
}
```

## 📚 Dynamic Zones

The `DynamicZoneManager` component maps Strapi dynamic zone components to React components:

| Strapi Component | React Component | Purpose |
|-----------------|-----------------|---------|
| `dynamic-zone.hero` | `<Hero />` | Hero section with heading and CTA |
| `dynamic-zone.dashboard-showcase` | `<DashboardShowcase />` | Dashboard preview with features |
| `dynamic-zone.social-proof` | `<SocialProof />` | Logo grid showing trusted companies |
| `dynamic-zone.bento-grid` | `<BentoGrid />` | Feature grid with illustrations |
| `dynamic-zone.documentation` | `<PlatformFeatures />` | Platform features with cards |
| `dynamic-zone.pricing` | `<Pricing />` | Pricing plans with monthly/annual toggle |
| `dynamic-zone.testimonials` | `<Testimonials />` | Customer testimonials carousel |
| `dynamic-zone.faq` | `<FAQ />` | Frequently asked questions accordion |
| `dynamic-zone.cta` | `<CTA />` | Call-to-action section |
| `blocks.story` | `<Story />` | Rich text content block |

## 🌍 i18n (Internationalization)

### Supported Locales

- **en** - English (default)
- **fr** - French
- **es** - Spanish
- **de** - German

### How It Works

1. **URL-based Routing**: `/{locale}/{page}`
   - `/en/` - English homepage
   - `/fr/` - French homepage
   - `/es/pricing` - Spanish pricing page

2. **Locale Context**: Available throughout app
   ```typescript
   import { useLocale } from '@/hooks'
   
   export default function Component() {
     const locale = useLocale()
     return <p>Current locale: {locale}</p>
   }
   ```

3. **Strapi Locales**: Content can be localized in CMS
   - Create content in multiple languages
   - Fetch locale-specific content

### Adding New Locale

1. Update `NEXT_PUBLIC_LOCALES` in `.env.local`
2. Add locale to `i18n-config.ts`
3. Generate static params in route pages
4. Test with: `http://localhost:3000/{new-locale}`

## 🔄 Data Synchronization with cs_cms

### Content Sync Strategy

The **cs_client** and **cs_cms** projects must stay synchronized:

#### What's Synchronized:

1. **Content Types**
   - Page schemas must match between CMS and frontend
   - Field names and types must be identical

2. **Dynamic Zones**
   - Available components defined in CMS
   - Matching React components in frontend
   - Same component names and properties

3. **Component Definitions**
   - Shared components (Button, Link, etc.)
   - Same field structure
   - Matching prop types

4. **Environment Variables**
   - `NEXT_PUBLIC_CMS_URL` points to running CMS
   - Must be accessible from client code

#### Sync Checklist:

```
When adding new component to cs_cms:
  ✓ Create component in Strapi admin
  ✓ Define fields and structure
  ✓ Create matching React component in cs_client
  ✓ Add to DynamicZoneManager
  ✓ Update TypeScript types
  ✓ Test rendering in development
  ✓ Verify in ISR revalidation
```

### API Integration

```typescript
// Fetch from Strapi
const response = await fetch(
  `${CMS_URL}/api/pages?populate=*&locale=${locale}`
)
const page = await response.json()

// Use in component with full type safety
export default function Page({ content }: Page) {
  return <DynamicZoneManager content={content} />
}
```

## 🔐 Security & Performance

### Security Features

- **Type Safety**: TypeScript prevents runtime errors
- **Validation**: Zod schemas for data validation
- **Headers**: Security headers configured in middleware
- **CSP**: Content Security Policy for XSS prevention
- **CORS**: Configured for Strapi CMS only

### Performance Optimizations

- **Code Splitting**: Automatic with Next.js
- **Image Optimization**: Next.js Image component
- **CSS Optimization**: Tailwind CSS purging unused styles
- **Font Optimization**: Next.js font optimization
- **Lazy Loading**: Components lazy-loaded on demand
- **Caching**: ISR + CDN for maximum performance

### Performance Metrics

- **First Contentful Paint (FCP)**: < 1s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Cumulative Layout Shift (CLS)**: < 0.1

## 🚢 Build & Deployment

### Development Build

```bash
pnpm build
```

### Production Build

```bash
pnpm build && pnpm start
```

### Docker Deployment

```bash
docker build -t cs-client .
docker run -p 3000:3000 cs-client
```

### Environment Variables for Production

```env
NODE_ENV=production
NEXT_PUBLIC_CMS_URL=https://api.mrvin100.com
NEXT_PUBLIC_DEFAULT_LOCALE=en
NEXT_PUBLIC_LOCALES=en,fr,es,de
```

## 📊 SEO Configuration

### Meta Tags & Structured Data

All pages include:

- ✅ Dynamic meta titles and descriptions
- ✅ Open Graph tags for social sharing
- ✅ Twitter card meta tags
- ✅ Canonical URLs
- ✅ Structured data (Schema.org)
- ✅ Sitemap generation
- ✅ robots.txt configuration

### SEO Checklist

```
For each page in Strapi:
  ✓ Set meta title (50-60 characters)
  ✓ Set meta description (150-160 characters)
  ✓ Add OG image (1200x630px)
  ✓ Set canonical URL
  ✓ Use heading hierarchy (H1, H2, H3)
  ✓ Add alt text to images
  ✓ Include internal links
  ✓ Optimize for mobile
```

## 🛠️ Development Workflows

### Add New Dynamic Zone Component

1. Create component in cs_cms Strapi admin
2. Create React component in `components/dynamic-zone/`
3. Add to `DynamicZoneManager` mapping
4. Update TypeScript types in `types/`
5. Test with ISR revalidation

### Add New Page

1. Create page in Strapi CMS
2. Set slug, title, meta tags
3. Add content via dynamic zones
4. Test at `/{locale}/{slug}`
5. Verify SEO metadata

### Deploy New Changes

```bash
# 1. Update code
git add .
git commit -m "feat: add new feature"
git push origin feature-branch

# 2. Create PR and merge
# 3. Deploy to production
# 4. Revalidate pages (if needed)
curl -X POST /api/revalidate?secret=SECRET&slug=page-slug
```

## 📦 Available Scripts

```bash
# Development
pnpm dev              # Start dev server

# Build & Production
pnpm build            # Build for production
pnpm start            # Start production server

# Linting & Quality
pnpm lint             # Run ESLint
pnpm type-check       # Check TypeScript

# Testing
pnpm test             # Run tests (if configured)

# Multi-process
pnpm dev:all          # Run client + CMS together (requires mprocs)
pnpm cms              # Run just the CMS
```

## 📝 Environment Variables Reference

| Variable | Type | Example | Description |
|----------|------|---------|-------------|
| `NEXT_PUBLIC_CMS_URL` | string | `http://localhost:1337` | Strapi CMS URL |
| `NEXT_PUBLIC_DEFAULT_LOCALE` | string | `en` | Default language |
| `NEXT_PUBLIC_LOCALES` | string | `en,fr,es,de` | Supported locales |
| `NEXT_PUBLIC_API_ROUTE` | string | `/api/trpc` | tRPC API route |

## 🔗 Integration with cs_cms

This client requires **cs_cms** to be running. Key integration points:

1. **API Calls**: Fetch from CMS REST API
2. **Dynamic Content**: Rendered from Strapi data
3. **Media Files**: Served from CMS media library
4. **Content Updates**: ISR revalidation on CMS changes

Setup and run cs_cms:

```bash
cd ../cs_cms
npm run dev
```

## 🐛 Troubleshooting

### CMS Connection Failed

```
Error: Failed to fetch from CMS
Solution: Ensure cs_cms is running at the URL in NEXT_PUBLIC_CMS_URL
```

### Dynamic Zones Not Rendering

```
Problem: Dynamic zone components missing
Solution: 
  1. Verify component exists in cs_cms
  2. Check DynamicZoneManager mapping
  3. Ensure component name matches exactly
```

### ISR Not Updating

```
Problem: Changes in CMS not appearing
Solution:
  1. Trigger revalidation via API
  2. Check Next.js build cache: rm -rf .next
  3. Verify ISR configuration in page component
```

### Build Fails with Type Errors

```bash
# Clear cache and rebuild
rm -rf .next node_modules
pnpm install
pnpm build
```

## 📚 Useful Resources

- [Next.js 16 Documentation](https://nextjs.org/docs)
- [Next.js SSG & ISR](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Strapi CMS Documentation](https://docs.strapi.io)
- [Framer Motion](https://www.framer.com/motion)

## 🔗 Related Projects

- **cs_cms**: Strapi CMS backend (required for running cs_client)
- **db**: Database management utilities
- **brillance-saa-s-landing-page**: Static landing page reference

## 📄 License

MIT

---

**Last Updated**: 2026-04-24  
**Maintainer**: MRVIN100 Development Team
