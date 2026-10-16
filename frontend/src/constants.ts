import { ImagePosition, Vector2 } from "./utils/positions";

export const WORLD_BOUNDS = {
	topLeft: new Vector2(-23818, -10426),
	bottomRight: new Vector2(14911, 13693),
};

export const WORLD_SIZE = new Vector2(
	WORLD_BOUNDS.bottomRight.x - WORLD_BOUNDS.topLeft.x,
	WORLD_BOUNDS.bottomRight.y - WORLD_BOUNDS.topLeft.y,
);

export const WORLD_CENTER = new Vector2(
	(WORLD_BOUNDS.topLeft.x + WORLD_BOUNDS.bottomRight.x) / 2,
	(WORLD_BOUNDS.topLeft.y + WORLD_BOUNDS.bottomRight.y) / 2,
);

export const MAP_IMAGE_SIZE = new Vector2(19366, 12061);

export const AREA_MARKERS = Object.fromEntries(
	Object.entries({
		"Gleethrop End": new Vector2(-1502, 7910),
		Groenewoud: new Vector2(-14658, -3762),
		"Dovedale East": new Vector2(1231, 534),
		"Fanory Mill": new Vector2(-16821, -3954),
		Mazewood: new Vector2(-6473, 11481),
		Conby: new Vector2(-11688, -3270),
		"Codsall Castle": new Vector2(9991, 5236),
		Masonfield: new Vector2(10667, -881),
		"Benyhone Loop": new Vector2(-19532, -5201),
		Perthtyne: new Vector2(-2618, 10055),
		Ashburn: new Vector2(-22012, -6729),
		"Cosdale Harbour": new Vector2(4325, -2518),
		"Glassbury Junction": new Vector2(11592, 8663),
		"Dovedale Central": new Vector2(3157, 805),
		"Wington Mount": new Vector2(2922, -2830),
		"Marigot Crossing": new Vector2(7692, 2205),
		Satus: new Vector2(-7485, -3055),
		"Cosdale Town": new Vector2(5860, -5155),
		"Westwood Park": new Vector2(1513, 3414),
		"Wington Quarry": new Vector2(2676, -3410),
	}).map(([area, position]) => [area, ImagePosition.fromWorld(position)]),
);

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
