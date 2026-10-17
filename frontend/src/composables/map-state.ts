import { defineStore } from "pinia";
import { reactive } from "vue";
import type { Player } from "../utils/players";

/**
 * State for the map itself
 */
export const useMapStore = defineStore("map", () => {
	return reactive<{ zoom: number; selectedPlayer: Player | null }>({
		zoom: 1,
		selectedPlayer: null,
	});
});
