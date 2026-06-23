# Recipes

Cooking recipe app: public catalog, recipe details,
authentication, favorites, and a welcome email upon registration.

## Tech Stack

- Next.js 16 (App Router) + TypeScript
- Material UI (MUI)
- MongoDB + Mongoose, behind a service layer (`src/services`)
- NextAuth v5 (Credentials Provider + bcrypt)
- Nodemailer (welcome email via Gmail)
- Cloudinary (hosting for seed recipe images)

> **Note:** The project runs on Next.js 16, which renamed
> `middleware.ts` to `proxy.ts` (same purpose; see `src/proxy.ts`). If
> you see references to “middleware” in Next 15 tutorials, that’s the file.

## Installation

```bash
npm install
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```env
MONGODB_URI=
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
GMAIL_USER=
GMAIL_APP_PASSWORD=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

- `MONGODB_URI`: MongoDB connection string (Atlas or local).
- `NEXTAUTH_SECRET`: Generate one using `openssl rand -base64 32`.
- `GMAIL_USER` / `GMAIL_APP_PASSWORD`: optional. `GMAIL_APP_PASSWORD` is
  an [“app password”](https://myaccount.google.com/apppasswords)
  (requires two-step verification to be enabled on the Gmail account), not the
  regular password. If these are not configured, the welcome email is skipped
  (a warning is logged) rather than failing the registration.
- `CLOUDINARY_*`: your Cloudinary account credentials, used only by
  the seed script to upload recipe images.

## Seed Data

Load 10 sample recipes (easy/intermediate/difficult) and upload their
images to Cloudinary:

```bash
npm run seed
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

| Route            | Description               | Auth |
| --------------- | -------------------------- | ---- |
| `/`              | List of recipes         | No   |
| `/recipes/[id]`  | Recipe details          | No   |
| `/login`         | Login           | No   |
| `/register`      | User registration    | No   |
| `/favorites`     | Favorite recipes    | Yes   |

## Architecture

All interactions with MongoDB (and with external services such as Cloudinary or
Gmail) goes through `src/services/`. No page, component, Server Action,
or Route Handler accesses Mongoose directly.

```
src/
├── app/            # routes, layouts, and Server Actions (app/actions)
├── components/     # reusable UI components
├── services/       # the only layer that interacts with MongoDB / Cloudinary / Gmail
├── models/         # Mongoose schemas
├── hooks/          # reusable client hooks
├── lib/            # MongoDB connection
├── types/          # shared types
├── utils/          # pure formatting functions
├── auth.ts         # NextAuth configuration
└── proxy.ts         # protection for /favorites (replaces middleware.ts)
```

## Commands

```bash
npm run dev      # development server
npm run build    # production build
npm run start    # production server
npm run lint     # ESLint
npm run seed     # load initial data
```
