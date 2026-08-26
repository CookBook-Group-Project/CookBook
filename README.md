# CookBook

Register, post recipes with ingredients/directions/an image URL, browse everyone else's, and manage your
own.

**Stack**: MongoDB + Express 5 + React 19 (Vite) + Node, ESM throughout.

## Local development

### 1. Start MongoDB

`docker-compose.dev.yml` runs a local Mongo instance only (the app itself runs natively via `npm`, below,
for hot-reload during development — this is not the production setup, see [Deployment](#deployment)):

```bash
docker compose -f docker-compose.dev.yml up -d
```

This gives you `mongodb://localhost:27017` with data persisted in a named Docker volume, so it survives
container restarts.

### 2. Configure environment variables

Both `client/` and `server/` have a `.env.example` listing what's needed. Copy each to `.env` in the same
folder and fill in real values:

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

`server/.env` needs a `SECRET_KEY` (any random string — e.g. `openssl rand -hex 32`), `MONGO_URI`
(`mongodb://localhost:27017/CookBook` if using the compose file above), and `CORS_ORIGINS`
(`http://localhost:3000` for local dev).

`client/.env` just needs `VITE_API_URL=http://localhost:8000`.

### 3. Install and run

In two terminals:

```bash
cd server && npm install && npm start    # http://localhost:8000
cd client && npm install && npm run dev  # http://localhost:3000
```

## Backing up the database

`scripts/db-backup.sh` and `scripts/db-restore.sh` wrap `mongodump`/`mongorestore` against whichever compose
stack is currently running (local dev or production — both use a service named `mongo`), so the same two
scripts work unmodified in either environment. This matters because Mongo's data only exists in a Docker
volume — a `docker compose down -v`, a `docker system prune`, or a bad volume clear loses everything unless
you've backed it up first.

```bash
./scripts/db-backup.sh                      # writes backups/cookbook-<timestamp>.gz
./scripts/db-restore.sh backups/cookbook-<timestamp>.gz
```

`backups/` is gitignored — these are data dumps, not code, and can contain real user emails and password
hashes.

## Deployment

Containerized: `client/Dockerfile` builds the React app and serves it via nginx, `server/Dockerfile` runs
the Express API, `docker-compose.yml` (the production one, distinct from `docker-compose.dev.yml` above)
wires both together with a `mongo` service on an internal-only network — nginx is the only container that
also joins the external `edge` network, and proxies `/api/*` to the server container internally, so the
client and API are same-origin in production (no CORS needed there).

CI/CD mirrors the moodRING/psoteropulos repos: merging a PR to `main` builds and pushes both images to
GHCR, then a self-hosted runner on the deploy host pulls and restarts via `docker compose pull && docker
compose up -d`. See `.github/workflows/deploy.yml`.

### First-time deploy setup (k12dmz)

One-time steps before the workflow above can succeed — do these in order:

1. **Self-hosted runner**: register a runner for this repo specifically (repos on this k12dmz box are
   repo-scoped, not org-scoped) — a separate `~/actions-runner-cookbook` directory + its own registration
   token from this repo's Settings → Actions → Runners → New runner, run as its own service alongside the
   existing psoteropulos/moodRING runners. When `config.sh` prompts for a runner group before the runner
   name, leave it blank (default "Default" group) — typing the intended runner name there throws "could not
   find any self hosted runner group named...".
2. **Branch protection**: in this repo's Settings → Branches, confirm `main` requires a PR before merging
   (same rule as the other two repos) — add it if not already there.
3. **`~/apps/cookbook/` on k12dmz**:
   ```bash
   mkdir -p ~/apps/cookbook && cd ~/apps/cookbook
   git clone <this repo's URL> .
   ```
   Note the trailing `.` — omitting it clones into a nested subdirectory instead of the current one, which
   breaks the deploy workflow's expected paths (this is exactly what happened on moodRING's first deploy
   attempt).
   ```bash
   cp server/.env.example .env   # then fill in real values, see below
   ```
   The `.env` here is read by `docker-compose.yml`'s `env_file: .env` for the `server` service — needs
   `SECRET_KEY`, `MONGO_URI=mongodb://mongo:27017/CookBook` (note the container hostname, not `localhost`),
   `CORS_ORIGINS=https://cookbookapp.net`.
4. **GHCR pull access**: no action needed yet — once the first images exist (after step 6), run `docker
   compose pull` here and confirm it succeeds. The existing PAT already covers psoteropulos and moodRING and
   is very likely account-wide, so it should just work; only generate a new one if that pull actually fails.
5. **Domain**: `cookbookapp.net`. Add a Published Application Route for it in the existing shared
   `cloudflared` tunnel, pointing at `cookbook-web:80` (confirm nameservers/zone are already active the
   same way psoteropulos's and moodRING's were before adding the route).
6. **Trigger the actual deploy**: merge a real PR to `main`. Watch the Actions run — `build-and-push` then
   `deploy`. Once it's done, `docker compose ps` on k12dmz should show `cookbook-web`/`-server`/`-mongo` all
   up, and the chosen domain should resolve to the running app.
