// not at all inspired by Nuxt UI
import tailwindColors from "tailwindcss/colors";

export type Color =
	| "primary"
	| "secondary"
	| "success"
	| "info"
	| "warning"
	| "error"
	| "neutral";

export type CssColor = string;

const colors: Record<Color, CssColor> = {
	primary: tailwindColors.blue[500],
	secondary: tailwindColors.green[500],
	success: tailwindColors.green[500],
	info: tailwindColors.blue[500],
	warning: tailwindColors.yellow[500],
	error: tailwindColors.red[500],
	neutral: tailwindColors.zinc[500],
};

export default colors;
