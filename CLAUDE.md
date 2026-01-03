# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a markdown-based blog platform built with React, Vite, Convex, and TypeScript. Content is authored in markdown files in the `content/` directory and synced to a Convex backend via custom scripts. The site supports blog posts, static pages, a writing interface, and various features like AI chat, newsletter signup, contact forms, and analytics.

## Development Commands

**Start development server:**
```bash
npm run dev
```

**Build for production:**
```bash
npm run build
```

**Run type checking:**
```bash
npm run typecheck
```

**Run linting:**
```bash
npm run lint
```

**Content sync scripts (development):**
```bash
npm run sync                    # Sync blog posts and pages to Convex
npm run sync:discovery          # Sync discovery files to Convex
npm run sync:all                # Run both sync scripts
```

**Content sync scripts (production):**
```bash
npm run sync:prod               # Sync to production Convex deployment
npm run sync:discovery:prod     # Sync discovery files to production
npm run sync:all:prod           # Run both sync scripts to production
```

**Other useful scripts:**
```bash
npm run import                  # Import content from a URL
npm run configure               # Configure fork settings
npm run deploy                  # Sync and build
npm run deploy:prod             # Deploy to production (Convex deploy + sync)
```

## Architecture

### Content Management Flow

1. **Authoring:** Content is written as markdown files in `content/blog/` (posts) and `content/pages/` (static pages)
2. **Syncing:** The `scripts/sync-posts.ts` script parses frontmatter from markdown files and upserts documents to the `posts` and `pages` tables in Convex
3. **Serving:** React components fetch content from Convex using queries and render it with `react-markdown`

### Key Directories

- `src/components/` - React components (Layout, Post, BlogHeroCard, etc.)
- `src/pages/` - Route pages (Home, Blog, Post, Write, Stats, etc.)
- `src/config/` - Configuration files (siteConfig.ts has extensive site-wide settings)
- `src/context/` - React contexts (Theme, Font, Sidebar)
- `src/hooks/` - Custom React hooks
- `src/styles/` - Global CSS
- `convex/` - Convex backend (schema, queries, mutations, actions, HTTP endpoints)
- `scripts/` - Build and sync scripts
- `content/` - Markdown source files (not tracked in git typically)
- `public/` - Static assets

### Frontend Routing

Routes are defined in `src/App.tsx`:
- `/` - Homepage (either default Home component or custom page/post based on `siteConfig.homepage`)
- `/blog` - Blog listing page (configurable via `siteConfig.blogPage.enabled`)
- `/:slug` - Individual posts or pages
- `/tags/:tag` - Tag filtered posts
- `/author/:authorSlug` - Author filtered posts
- `/write` - Writing interface (no Layout wrapper)
- `/stats` - Analytics page (no Layout wrapper)
- `/newsletter-admin` - Newsletter admin (no Layout wrapper)
- `/dashboard` - Dashboard (no Layout wrapper)
- `/callback` - WorkOS OAuth callback

### Convex Schema

Key tables in `convex/schema.ts`:
- `posts` - Blog posts with frontmatter metadata
- `pages` - Static pages (about, projects, contact, etc.)
- `viewCounts` - Analytics for post/page views
- `pageViews` - View event records (event records pattern to avoid write conflicts)
- `activeSessions` - Real-time visitor tracking
- `aiChats` - AI conversation history for the writing assistant
- `newsletterSubscribers` - Email subscriptions
- `contactMessages` - Contact form submissions
- `siteConfig` - Dynamic site configuration stored in Convex

### Frontmatter Schema

Both posts and pages use frontmatter with these common fields:

**Required:**
- `title` - Post/page title
- `description` - Meta description
- `date` - Publication date
- `slug` - URL path
- `published` - Whether to show in listings

**Optional:**
- `tags` - Array of tag strings
- `readTime` - Read time string
- `image` - Header/OG image URL
- `showImageAtTop` - Display image at top (default: false)
- `excerpt` - Short excerpt for cards
- `featured` - Show in featured section
- `featuredOrder` - Order in featured section (lower = first)
- `authorName` - Author display name
- `authorImage` - Author avatar URL
- `layout` - "sidebar" for docs-style layout
- `rightSidebar` - Enable right sidebar with CopyPageDropdown
- `showFooter` - Override footer display
- `footer` - Custom footer markdown
- `showSocialFooter` - Override social footer display
- `aiChat` - Enable AI chat in right sidebar
- `blogFeatured` - Hero featured post on /blog page
- `newsletter` - Override newsletter signup (true/false)
- `contactForm` - Enable contact form
- `unlisted` - Hide from listings but allow direct access
- `textAlign` - Text alignment for pages ("left", "center", "right")

### Site Configuration

The `src/config/siteConfig.ts` file contains extensive configuration for:
- Basic site info (name, title, logo, intro, bio)
- Font family (serif, sans, monospace)
- Featured section and logo gallery
- GitHub contributions graph
- Blog page behavior
- Navigation items (hardcoded React routes)
- Posts display locations (home vs blog page)
- Footer and social footer
- Homepage customization (default vs custom page/post)
- AI chat settings
- Newsletter signup forms
- Contact forms
- Stats page
- MCP server
- Dashboard
- Image lightbox

### Convex Function Patterns

This codebase follows specific Convex best practices:

1. **Always use new function syntax** with explicit args/returns validators:
   ```typescript
   export const myQuery = query({
     args: { postId: v.id("posts") },
     returns: v.null(),
     handler: async (ctx, args) => { ... }
   });
   ```

2. **Prevent write conflicts** (see `.cursor/rules/convex-write-conflicts.mdc`):
   - Make mutations idempotent with early returns
   - Patch directly without reading first when possible
   - Use indexed queries to minimize read scope
   - Use Promise.all for parallel independent updates
   - Frontend: use refs and debouncing to prevent duplicate calls

3. **Use proper function types**:
   - `query` - Public read-only functions
   - `mutation` - Public write functions
   - `action` - Public functions that can use Node.js APIs
   - `internalQuery`/`internalMutation`/`internalAction` - Private functions

4. **Include return type validators** - Always specify `returns` even for null returns

5. **Don't use filter in queries** - Use indexes and `withIndex` instead

### Authentication

The app supports optional WorkOS authentication:
- Check if configured with `isWorkOSConfigured()` utility
- `AppWithWorkOS.tsx` wraps the app with WorkOS AuthKit when configured
- Convex functions use `ctx.auth.getUserIdentity()` for auth checks

### Environment Variables

**Development (`.env.local`):**
- `VITE_CONVEX_URL` - Convex deployment URL

**Production (`.env.production.local`):**
- `VITE_CONVEX_URL` - Production Convex URL

**Convex environment variables (set in dashboard):**
- `ANTHROPIC_API_KEY` - For AI chat features (Claude)
- `AGENTMAIL_API_KEY` - For newsletter sending
- `AGENTMAIL_INBOX` - Default inbox for newsletter
- `AGENTMAIL_CONTACT_EMAIL` - Optional contact form recipient override
- `WORKOS_API_KEY` - WorkOS authentication (optional)
- `WORKOS_CLIENT_ID` - WorkOS client ID (optional)
- `MCP_API_KEY` - MCP server authentication (optional)

### Writing New Content

1. Create markdown file in `content/blog/` or `content/pages/`
2. Add frontmatter with required fields
3. Run `npm run sync` to upload to Convex
4. Content is immediately available on the site

### Common Patterns

**Adding a new feature that requires Convex storage:**
1. Add table to `convex/schema.ts` with proper indexes
2. Create queries/mutations in appropriate `convex/*.ts` files
3. Use `useQuery` and `useMutation` hooks in React components
4. Follow write conflict prevention patterns

**Adding a new page route:**
1. If it's a React component route, add to `src/App.tsx` and `siteConfig.hardcodedNavItems`
2. If it's a markdown page, create file in `content/pages/` and sync

**Adding frontmatter options:**
1. Update TypeScript interfaces in `scripts/sync-posts.ts`
2. Update `convex/schema.ts` table definitions
3. Update components that use the new fields
