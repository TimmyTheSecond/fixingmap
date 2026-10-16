import { defineStore } from "pinia";
import { reactive } from "vue";

/**
 * State for the map itself
 */
export const useMapStore = defineStore("map", () => {
	return reactive({
		zoom: 1,
		focusedPlayer: 1,
	});
});
