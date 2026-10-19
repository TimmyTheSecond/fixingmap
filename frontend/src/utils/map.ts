import useWindowSize from "../composables/window-size";
import { MAP_IMAGE_SIZE } from "../constants";
import { useMapStore } from "../composables/map-state";
import { ImagePosition } from "./positions";
import type { Player } from "./players";
import clustering from "density-clustering";

const MERGE_DISTANCE_PIXELS = 8;
const MAX_FLIP_DISTANCE_PIXELS = 180;
const MAX_FLIP_VERTICAL_PIXELS = 10;

const { width: windowWidth } = useWindowSize();

export function groupPlayers(players: Player[]) {
	const mapState = useMapStore();
	const screenPixelsPerImagePixel =
		(windowWidth.value / MAP_IMAGE_SIZE.x) * mapState.zoom;
	console.log(screenPixelsPerImagePixel);

	const mergeDistanceImagePixels =
		MERGE_DISTANCE_PIXELS / screenPixelsPerImagePixel;
	const positions = players.map((player) => {
		const position = ImagePosition.fromWorld(player.position);
		return [position.x, position.y];
	});

	return new clustering.DBSCAN()
		.run(positions, mergeDistanceImagePixels, 1)
		.map((indexes) =>
			indexes
				.map((index) => players[index])
				.sort((first, second) =>
					first.displayName.localeCompare(second.displayName),
				),
		);
}

export function calculateFlip(playerGroups: Player[][]) {
	const mapState = useMapStore();

	const screenPixelsPerImagePixel = mapState.zoom;

	const groups = playerGroups.map((players) => {
		const positions = players.map((player) =>
			ImagePosition.fromWorld(player.position),
		);

		return {
			players,
			x:
				positions.reduce((sum, position) => sum + position.x, 0) /
				positions.length,
			y:
				positions.reduce((sum, position) => sum + position.y, 0) /
				positions.length,
		};
	});

	return groups.map((group) => ({
		players: group.players,
		flip: groups.some((other) => {
			if (other === group) {
				return false;
			}

			const horizontalPixels = (other.x - group.x) * screenPixelsPerImagePixel;
			const verticalPixels =
				Math.abs(other.y - group.y) * screenPixelsPerImagePixel;

			return (
				horizontalPixels >= 0 &&
				horizontalPixels <= MAX_FLIP_DISTANCE_PIXELS &&
				verticalPixels <= MAX_FLIP_VERTICAL_PIXELS
			);
		}),
	}));
}

export function getPlayerGroups(players: Player[]) {
	return calculateFlip(groupPlayers(players));
}
