import { defineStore } from "pinia";
import { reactive } from "vue";
import type { Player } from "../utils/players";
import { Vector2 } from "../utils/positions";

const examplePlayers: Player[] = [
	{
		username: "dgox_xd",
		displayName: "Dog",
		userId: 1,
		trains: {
			1: {
				data: {
					destination: "Fanory Mill",
					trainClass: "Passenger",
					headcode: "2G45",
					trainType: "Class 456",
					trainSpeed: 10,
					carriageCount: 2,
					spawnedByUsername: "dgox_xd",
				},
				carriages: [
					{
						position: new Vector2(1000, 500),
						size: new Vector2(63, 7),
						rotation: 45,
					},
					{
						position: new Vector2(1100, 520),
						size: new Vector2(63, 7),
						rotation: 45,
					},
				],
			},
		},
		position: new Vector2(1231, 534),
	},
	{
		username: "dgox_lol",
		displayName: "OnlyTwentyCharacters",
		userId: 2,
		trains: {},
		position: new Vector2(1201, 503),
	},
	{
		username: "dgox_exdee",
		displayName: "dgox_exdee",
		userId: 3,
		trains: {},
		position: new Vector2(1170, 502),
	},
	{
		username: "dg0x_lol",
		displayName: "dg0x_lol",
		userId: 4,
		trains: {},
		position: new Vector2(1201, 501),
	},
	{
		username: "cl0vermead0w",
		displayName: "jaiden",
		userId: 5,
		trains: {},
		position: new Vector2(1201, 500),
	},
];

const exampleServer1: Server = {
	players: examplePlayers,
	shortId: "e29e5b",
	longId: "4388d5a6-fdbf-4a9c-86d5-df7098e29e5b",
};

const exampleServer2: Server = {
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
