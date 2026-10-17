<script setup lang="ts">
import { onMounted, ref, useTemplateRef, watch } from "vue";
import { MAP_IMAGE_SIZE } from "../constants";
import createPanZoom, { type PanZoom } from "panzoom";
import PlayerDot from "./overlay/PlayerDot.vue";
import type { Player } from "../utils/players";
import { ImagePosition, Vector2 } from "../utils/positions";
import { useMapStore } from "../composables/map-state";

const examplePlayer: Player = {
	username: "dgox_xd",
	displayName: "Dog",
	userId: 1,
	trains: {},
	position: new Vector2(1231, 534),
};

const zoomElement = useTemplateRef<HTMLDivElement>("zoom");
const imageElement = useTemplateRef<HTMLImageElement>("image");
const mapState = useMapStore();

const players = ref([examplePlayer]);
let panzoom: PanZoom | null = null;

function zoomToImagePosition(position: ImagePosition) {
	panzoom?.smoothMoveTo(
		window.innerWidth / 2 - position.x * mapState.zoom,
		window.innerHeight / 2 - position.y * mapState.zoom,
	);
}

onMounted(async () => {
	if (!zoomElement.value)
		throw new Error("Could not find image or picture element");
	panzoom = createPanZoom(zoomElement.value, {
		maxZoom: 10,
		minZoom: 0.05,
		initialZoom: 0.067,
		smoothScroll: false,
		beforeMouseDown() {
			mapState.selectedPlayer = null;
		},
		beforeWheel(event) {
			if (!mapState.selectedPlayer) return false;

			event.preventDefault();
			const scaleMultiplier = event.deltaY < 0 ? 1.1 : 1 / 1.1;
			panzoom?.zoomTo(
				window.innerWidth / 2,
				window.innerHeight / 2,
				scaleMultiplier,
			);
			return true;
		},
	});

	watch(mapState, ({ selectedPlayer }) => {
		if (!selectedPlayer) return;
		const position = ImagePosition.fromWorld(selectedPlayer.position);
		zoomToImagePosition(position);
	});

	mapState.zoom = panzoom.getTransform().scale;
	panzoom.on("zoom", () => {
		mapState.zoom = panzoom!.getTransform().scale;
		console.log(mapState);
	});

	window.addEventListener("resize", () => {
		if (mapState.selectedPlayer) {
			zoomToImagePosition(
				ImagePosition.fromWorld(mapState.selectedPlayer.position),
			);
		}
	});

	await imageElement.value?.decode();
	zoomElement.value.style.backgroundImage = "";
});
</script>

<template>
	<div
		ref="zoom"
		class="will-change-transform bg-cover relative select-none"
		:style="`width: ${MAP_IMAGE_SIZE.x}px; height: ${MAP_IMAGE_SIZE.y}px; background-image: url(/src/assets/map-small.png)`"
	>
		<div class="absolute z-10 top-0 left-0 w-full h-full">
			<PlayerDot
				v-for="player in players"
				:id="`dot-${player.userId}`"
				:player="player"
				:key="player.userId"
				:selected="mapState.selectedPlayer === player"
				@select="mapState.selectedPlayer = player"
			/>
		</div>
		<picture class="overflow-hidden h-screen">
			<source type="image/avif" srcset="/src/assets/map.avif" />
			<img
				ref="image"
				class="max-w-none will-change-transform"
				src="/src/assets/map.png"
				:width="MAP_IMAGE_SIZE.x"
				:height="MAP_IMAGE_SIZE.y"
			/>
		</picture>
	</div>
</template>
