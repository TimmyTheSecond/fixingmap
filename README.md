# Dovedale Live Map

> [!NOTE]
> This is the in-development revamp of the Live Map, to bring it up to players' expectations.
>
> It replaces the frontend entirely, using Vue and Vite, adding info panels for players, trains and boxes, and far better rendering for trains and players.

Hosted at [map.dovedale.uk](https://map.dovedale.uk), this project aims to provide a near-realtime view of players in [Dovedale Railway](https://play.dovedale.uk).

Feel free to have a look through the code or contribute - just make sure you follow general style and document PRs and code changes properly.

## WebSocket Usage

You are free to use the data provided by the Live Map for your own projects.
You can connect to the WebSocket at `https://map.dovedale.uk/api/ws` (`/ws` still supported but deprecated) and you will receive a message every time a Roblox server sends a request to the web server.

The updated message payload and TypeScript & Luau types will be provided once its contents have been confirmed - there will be no immediate breaking changes but some properties, e.g. `trainData`, will be deprecated.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for a guide on submitting issues and PRs, plus local development.
