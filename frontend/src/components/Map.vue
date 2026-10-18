<script setup lang="ts">
import { computed, onMounted, useTemplateRef, watch } from "vue";
import { MAP_IMAGE_SIZE } from "../constants";
import createPanZoom, { type PanZoom } from "panzoom";
import PlayerDot from "./overlay/PlayerDot.vue";
import type { Player } from "../utils/players";
import { ImagePosition } from "../utils/positions";
import { useMapStore } from "../composables/map-state";
import { useServerStore } from "../composables/server-state";
import PlayerDotGroup from "./overlay/PlayerDotGroup.vue";

const zoomElement = useTemplateRef<HTMLDivElement>("zoom");
const imageElement = useTemplateRef<HTMLImageElement>("image");
const mapState = useMapStore();
const serverState = useServerStore();

const players = computed(
	() =>
		serverState.currentServer?.players ??
		serverState.servers.reduce<Player[]>(
			(players, server) => players.concat(server.players),
			[],
		),
);
let panzoom: PanZoom | null = null;

function zoomToImagePosition(position: ImagePosition) {
	panzoom?.smoothMoveTo(
		window.innerWidth / 2 - position.x * mapState.zoom,
		window.innerHeight / 2 - position.y * mapState.zoom,
	);
}

function selectPlayer(player: Player) {
	if (mapState.selectedPlayer === player) {
		mapState.selectedPlayer = null;
		return;
	}
	mapState.selectedPlayer = player;
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
		class="relative bg-cover will-change-transform select-none"
		:style="{
			width: MAP_IMAGE_SIZE.x + 'px',
			height: MAP_IMAGE_SIZE.y + 'px',
			backgroundImage: 'url(/src/assets/map-small.png)',
		}"
	>
		<div class="absolute top-0 left-0 z-10 h-full w-full">
			<!-- <PlayerDot
				v-for="player in players.slice(0, 1)"
				:player="player"
				:key="player.userId"
				:selected="mapState.selectedPlayer === player"
				:flip="false"
				@select="selectPlayer(player)"
			/> -->
			<PlayerDotGroup :players="players" :flip="false" :selected="false" />
		</div>
		players {{ players.length }}
		<picture class="h-screen overflow-hidden">
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
