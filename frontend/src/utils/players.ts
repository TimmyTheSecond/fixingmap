import { PLAYER_COLORS } from "../constants";
import type { Vector2 } from "./positions";

export interface Carriage {
	position: Vector2;
	size: Vector2;
	rotation: number;
}

export interface Train {
	data: {
		destination: string;
		trainClass: string;
		headcode: string;
		trainType: string;
		trainSpeed: number;
		carriageCount: number;
		spawnedByUsername: string;
	};
	carriages: Record<number, Carriage>;
}

export interface Player {
	username: string;
	displayName: string;
	userId: number;
	/** Indexed by carriage number (name) */
	trains: Record<number, Train>;
	box?: {
		name: string;
		fullName: string;
		isHost: boolean;
	};

	/** @deprecated `trains` should be used instead */
	trainData?: Train["data"];
	position: Vector2;
}

export function getPlayerColor(player: Player) {
	if (!player) return "#00FFFF";

	let value = 0;
	for (let index = 0; index < player.username.length; index++) {
		const charValue = player.username.charCodeAt(index);
		let reverseIndex = player.username.length - index;
		if (player.username.length % 2 === 1) reverseIndex--;
		value += reverseIndex % 4 >= 2 ? -charValue : charValue;
	}

	const colorIndex =
		((value % PLAYER_COLORS.length) + PLAYER_COLORS.length) %
		PLAYER_COLORS.length;
	return PLAYER_COLORS[colorIndex];
}
