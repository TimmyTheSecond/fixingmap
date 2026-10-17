<script setup lang="ts">
import { onMounted, useTemplateRef } from "vue";
import { MAP_IMAGE_SIZE } from "../constants";
import createPanZoom from "panzoom";
import PlayerDot from "./overlay/PlayerDot.vue";
import type { Player } from "../utils/players";
import { Vector2 } from "../utils/positions";
import { useMapStore } from "../composables/map-state";

const zoom = useTemplateRef<HTMLDivElement>("zoom");
const image = useTemplateRef<HTMLImageElement>("image");
const mapState = useMapStore();
const examplePlayer: Player = {
	username: "dgox_xd",
	userId: 1,
	trains: {},
	position: new Vector2(1231, 534),
};

onMounted(async () => {
	if (!zoom.value) throw new Error("Could not find image or picture element");
	const panzoom = createPanZoom(zoom.value, {
		maxZoom: 10,
		minZoom: 0.05,
		initialZoom: 0.067,
		smoothScroll: false,
	});
	mapState.zoom = panzoom.getTransform().scale;
	panzoom.on("zoom", () => {
		mapState.zoom = panzoom.getTransform().scale;
	});

	await image.value?.decode();
	zoom.value.style.backgroundImage = "";
});
</script>

<template>
	<div
		ref="zoom"
		class="will-change-transform bg-cover relative select-none"
		:style="`width: ${MAP_IMAGE_SIZE.x}px; height: ${MAP_IMAGE_SIZE.y}px; background-image: url(/src/assets/map-small.png)`"
	>
		<div class="absolute z-10 top-0 left-0 w-full h-full">
			<PlayerDot :player="examplePlayer" />
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
