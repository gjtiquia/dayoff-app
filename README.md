# supermarket app

## environment variables

`/backend/.env` is expected for running in a local environment. see `/backend/.env.example`.

## commands

prerequisites: 
- [pnpm installed](https://pnpm.io/installation)

### development commands

```bash
# install all dependencies
pnpm install

# you may see the following:
# Ignored build scripts: esbuild. Run "pnpm approve-builds" to pick which dependencies should be allowed to run scripts.
# if so, then run "pnpm approve-builds", and then approve all packages to build
```

```bash
# open a new terminal tab/window with /backend as the root
cd backend

# start dev server at port 3000
pnpm run dev
```

```bash
# open a new terminal tab/window with /web-app as the root
cd web-app

# start dev server at port 5173
pnpm run dev
```

### production commands

```bash
# install all dependencies
pnpm install

# build for production
pnpm run build

# serve /backend at port 3000
pnpm run start
```

## Known Issues
- as of 2025-02-01, Tailwind v4 has been released, but shadcn/ui does not officially support Tailwind v4 yet.
    - [Related Issue](https://github.com/shadcn-ui/ui/discussions/2996)
    - [shadcn progress in upgrading to v4](https://github.com/shadcn/app-tailwind-v4)
    - best not to use shadcn/ui yet until v4 is officially supported
        - tho for now copy and pasted `globals.css` to our `index.css` from `shadcn/app-tailwind-v4`
    - shadcn is LOCKED IN and working on it
        - https://x.com/shadcn/status/1886113728623767563?s=46

## TODO

- [x] auth with better-auth (email + password first for now)
- [x] study if its easy to add OAuth in the future and auto merge with email/password
    - pretty straightforward: https://www.better-auth.com/docs/concepts/users-accounts#account-linking
- [x] sign up / sign in flow
- [x] only allow adding items if signed in (C in CRUD)
- [ ] database schema setup for adding items
- [ ] allow reading items if not signed in (R in CRUD) (just read most recent with pagination first)
- [ ] only allow updating and deleting items that i have uploaded (U in CRUD)
- [ ] search queries - by name
- [ ] show lowest, highest, average price
- [ ] price history graph