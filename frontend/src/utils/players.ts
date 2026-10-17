import { PLAYER_COLORS } from "../constants";
import type { Vector2 } from "./positions";

export interface Vector3 {
	x: number;
	y: number;
	z: number;
}

export interface CarriageData {
	position: Vector3;
	size: Vector3;
	rotation: number;
}

export interface TrainData {
	data: {
		destination: string;
		trainClass: string;
		headcode: string;
		trainType: string;
		trainSpeed: number;
		carriageCount: number;
		carriageAmount: number;
		spawnedByUsername: string;
	};
	carriages: CarriageData[];
}

export interface Player {
	username: string;
	displayName: string;
	userId: number;
	/** Indexed by carriage number (name) */
	trains: Record<number, TrainData>;
	box?: {
		name: string;
		fullName: string;
		isHost: boolean;
	};

	/** @deprecated `trains` should be used instead */
	trainData?: TrainData["data"];
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
