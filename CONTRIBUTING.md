# Contributing

## Creating an Issue

- **Reporting bugs:** If you find a bug, please provide image/video proof of it and make sure there isn't an existing issue for it.
- **Feature requests:** Check that there isn't an existing issue. We ask that PRs that add features first create a feature request so the maintainers can discuss whether the feature is desired and the design of that feature.

## Creating a Pull Request

### Before You Start

Before making a pull request that adds functionality to the map, please first check if there's a feature request for it. If not, please make one yourself so we can discuss if it's desired and, if so, what the design could look like.

### Setting Up

Install the relevant dependencies ([Bun](https://bun.com/get) is recommended), create a .env and start the frontend and backend:

```bash
bun install
cp .env.example .env
bun dev
```

`bun dev` will start both the frontend and backend with [concurrently](https://www.npmjs.com/package/concurrently), outputs combined. You can also individually run them:

```bash
bun dev:frontend
bun dev:server # Not required, frontend will fall back to production WebSocket
```

Then, head to http://localhost:5173 to view the map.

### Submitting the Pull Request

When making a pull request, please ensure there aren't any unrelated changes, features or fixes.
We would much rather have 5 PRs for a feature each than 1 with all 5 features so we can review and merge them separately.

## Use of AI

Although we welcome proper use of AI tools, we ask you to follow a few core principles.

- Comments, PR and issue descriptions should be written in your own voice
- Clear and human communication is more important than perfect grammar or spelling
- Feel free to use AI tools to generate ideas or small code snippets, but we won't accept PRs that are mostly or entirely AI-written
- Only submit contributions that you fully understand and are able to explain
- Contributions should show your own reasoning and problem-solving
