import { defineStore } from "pinia";
import { reactive } from "vue";
import type { Player } from "../utils/players";
import { Vector2 } from "../utils/positions";

const examplePlayer: Player = {
	username: "dgox_xd",
	displayName: "Dog",
	userId: 1,
	trains: {},
	position: new Vector2(1231, 534),
};

const exampleServer1 = {
	players: [examplePlayer],
	shortId: "e29e5b",
	longId: "4388d5a6-fdbf-4a9c-86d5-df7098e29e5b",
};

const exampleServer2 = {
	players: [],
	shortId: "db2e29",
	longId: "ea228782-1362-47b4-964e-8aeb3ddb2e29",
};

export interface Server {
	players: Player[];
	shortId: string;
	longId: string;
}

export const useServerStore = defineStore("server", () => {
	return reactive<{
		currentServer: Server | null;
		servers: Server[];
	}>({
		currentServer: exampleServer1,
		servers: [exampleServer1, exampleServer2],
	});
});
