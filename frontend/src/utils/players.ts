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
	userId: number;
	/** Indexed by carriage number (name) */
	trains: Record<number, TrainData>;
	box?: {
		name: string;
		fullName: string;
		isHost: boolean;
	};

	/** @deprecated `trains` should be used instead */
	trainData: TrainData["data"];
	position: {
		x: number;
		y: number;
	};
}
