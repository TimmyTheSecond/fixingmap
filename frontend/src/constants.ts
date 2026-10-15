export const WORLD_BOUNDS = {
	TOP_LEFT: { x: -23818, y: -10426 },
	BOTTOM_RIGHT: { x: 14911, y: 13693 },
};

export const WORLD_SIZE = {
	x: WORLD_BOUNDS.BOTTOM_RIGHT.x - WORLD_BOUNDS.TOP_LEFT.x,
	y: WORLD_BOUNDS.BOTTOM_RIGHT.y - WORLD_BOUNDS.TOP_LEFT.y,
};

export const WORLD_CENTER = {
	x: (WORLD_BOUNDS.TOP_LEFT.x + WORLD_BOUNDS.BOTTOM_RIGHT.x) / 2,
	y: (WORLD_BOUNDS.TOP_LEFT.y + WORLD_BOUNDS.BOTTOM_RIGHT.y) / 2,
};

export const MAP_IMAGE_SIZE = {
	x: 19366,
	y: 12061,
};

export const AREA_MARKERS = {
	"Gleethrop End": {
		x: -1502,
		y: 7910,
	},
	Groenewoud: {
		x: -14658,
		y: -3762,
	},
	"Dovedale East": {
		x: 1231,
		y: 534,
	},
	"Fanory Mill": {
		x: -16821,
		y: -3954,
	},
	Mazewood: {
		x: -6473,
		y: 11481,
	},
	Conby: {
		x: -11688,
		y: -3270,
	},
	"Codsall Castle": {
		x: 9991,
		y: 5236,
	},
	Masonfield: {
		x: 10667,
		y: -881,
	},
	"Benyhone Loop": {
		x: -19532,
		y: -5201,
	},
	Perthtyne: {
		x: -2618,
		y: 10055,
	},
	Ashburn: {
		x: -22012,
		y: -6729,
	},
	"Cosdale Harbour": {
		x: 4325,
		y: -2518,
	},
	"Glassbury Junction": {
		x: 11592,
		y: 8663,
	},
	"Dovedale Central": {
		x: 3157,
		y: 805,
	},
	"Wington Mount": {
		x: 2922,
		y: -2830,
	},
	"Marigot Crossing": {
		x: 7692,
		y: 2205,
	},
	Satus: {
		x: -7485,
		y: -3055,
	},
	"Cosdale Town": {
		x: 5860,
		y: -5155,
	},
	"Westwood Park": {
		x: 1513,
		y: 3414,
	},
	"Wington Quarry": {
		x: 2676,
		y: -3410,
	},
};

export const PLAYER_COLORS = [
	"#FD2943",
	"#01A2FF",
	"#02B857",
	"#A75EB8",
	"#F58225",
	"#F5CD30",
	"#E8BAC8",
	"#D7C59A",
];
