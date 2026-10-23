# Anguiano

The Anguiano family app: a private, installable web app (PWA) for running the household. **Meals** is the first section; more get added as they come up.

## What's in it
- **Home:** greeting, today's lunch and dinner, tonight's freezer/prep reminder, and a tile for each section.
- **Meals:** the week's plan, recipes with cook mode, drag-and-drop rearranging, and a grocery list that syncs between phones. Plans live in `content/meals/` (see the README there).
- **Reminders:** push notifications at lunch (11–noon), dinner (5–6), and freezer reminders (9–10pm) in each phone's own time zone.
- **Login:** one family passcode gates the whole app.

## Stack
Next.js 16 (App Router), React 19, Tailwind 3, Upstash Redis (via the Vercel Marketplace), Web Push, Vercel Cron. Node 24.

## Layout
| Path | What |
|---|---|
| `app/page.tsx` | Home |
| `app/meals/`, `components/meals/`, `lib/meals/`, `content/meals/` | Meals section |
| `app/settings/` | Reminders and devices |
| `lib/` (`auth`, `push`, `redis`, `time`, `client`) | Shared across sections |
| `components/AppNav.tsx` | Bottom tab bar; add a tab per section |
| `app/api/cron/[job]` | Hourly tick (`tick-00`…`tick-23` in `vercel.json`) |
| `proxy.ts` | Passcode gate |

## Adding a section
1. Create `app/<section>/`, plus `lib/<section>/` and `components/<section>/` as needed.
2. Add a tile on the home page (`app/page.tsx`) and, if it deserves one, a tab in `components/AppNav.tsx`.
3. Store mutable data in Redis under a `<section>:` key prefix (`lib/redis.ts`).
4. Reminders: add slots alongside the meal ones in `lib/meals/reminders.ts` (or a sibling module) and call them from the cron tick.

## Development
```bash
npm install
cp .env.example .env.local   # fill in values
npm run dev
npm test                     # unit tests
```

## Manual checks (production)
- What reminders are due right now: `curl -H "Authorization: Bearer $CRON_SECRET" "https://<domain>/api/cron/tick?dryRun=1"`
- Send a reminder now: `curl -H "Authorization: Bearer $CRON_SECRET" "https://<domain>/api/cron/dinner?force=1"`
