import { MAP_IMAGE_SIZE, WORLD_BOUNDS, WORLD_SIZE } from "../constants";
import type { Vector3 } from "./players";

export class Vector2 {
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	static average(vectors: Vector2[]): Vector2 {
		if (vectors.length === 0) {
			throw new Error("Cannot average an empty array of vectors");
		}

		let totalX = 0;
		let totalY = 0;

		for (const vector of vectors) {
			totalX += vector.x;
			totalY += vector.y;
		}

		return new Vector2(totalX / vectors.length, totalY / vectors.length);
	}
}

export class ImagePosition {
	position: Vector2;
	x: number;
	y: number;

	private constructor(position: Vector2) {
		this.position = position;
		this.x = position.x;
		this.y = position.y;
	}

	static fromWorld(worldPosition: Vector2 | Vector3) {
		return new ImagePosition(worldToImage(worldPosition));
	}
}

export function worldToImage(world: Vector2 | Vector3): Vector2 {
	return {
		x: ((world.x - WORLD_BOUNDS.topLeft.x) / WORLD_SIZE.x) * MAP_IMAGE_SIZE.x,
		y: ((world.y - WORLD_BOUNDS.topLeft.y) / WORLD_SIZE.y) * MAP_IMAGE_SIZE.y,
	};
}

export function imageToWorld(image: Vector2 | Vector3): Vector2 {
	return {
		x: (image.x / MAP_IMAGE_SIZE.x) * WORLD_SIZE.x + WORLD_BOUNDS.topLeft.x,
		y: (image.y / MAP_IMAGE_SIZE.y) * WORLD_SIZE.y + WORLD_BOUNDS.topLeft.y,
	};
}
