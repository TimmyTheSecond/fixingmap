import { defineStore } from "pinia";
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
	const mapState = useMapStore();
	return {
		zoomedIn: computed(() => mapState.zoom > 0.4),
		zoomedInFar: computed(() => mapState.zoom > 2),
	};
}
