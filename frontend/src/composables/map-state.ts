import { defineStore, storeToRefs } from "pinia";
import { computed, reactive } from "vue";
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

export function useMapZoom() {
	const { zoom } = storeToRefs(useMapStore());

	return {
		zoomedIn: computed(() => zoom.value > 0.6),
		zoomedInFar: computed(() => zoom.value > 2),
		zoom: zoom,
	};
}
