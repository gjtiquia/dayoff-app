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

# setup postgres schema if have not already done so
pnpm run db:push

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

- [ ] put schedule in postgres schema
- [ ] request leave, should read from schedule, and the range automatically converts into the hours, with the lunch hours too