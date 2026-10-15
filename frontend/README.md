# Map Frontend

This folder contains the map's frontend, using Vue and Typescript, built by Vite.

In a dev environment, the Hono backend is ran separately, but in production Hono just serves the files built by Vite.

If you want to host the backend yourself (if you're making changes to it or are otherwise testing things), you'll have to run the Vite dev server and `server.ts` at the same time:

```bash
bun dev:server
```

and in a separate pane/window/tab:

```bash
bun dev:frontend
```

Or you can run both in one window with `concurrently`, but this may be hard to read as logs are combined:

```bash
bun dev
```
