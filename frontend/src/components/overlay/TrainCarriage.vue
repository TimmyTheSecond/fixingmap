<script setup lang="ts">
import { computed, ref } from "vue";
import { getPlayerColor, type Player, type Train } from "../../utils/players";
import { ImagePosition } from "../../utils/positions";
import { useMapStore, useMapZoom } from "../../composables/map-state";
import { useServerStore } from "../../composables/server-state";

const MAX_SCALE_ZOOM = 2;
const MINIMUM_SCALE = 0.5;

const mapZoom = useMapZoom();
const mapState = useMapStore();
const serverState = useServerStore();

const emit = defineEmits<{ select: [] }>();
const props = defineProps<{
	player: Player;
	train: Train;
	carriageIndex: number;
	selected: boolean;
	side: "top" | "left" | "right";
}>();
const carriage = props.train.carriages[props.carriageIndex];

const dotScale = computed(() => {
	const proportionalScale = mapState.zoom / MAX_SCALE_ZOOM;
	return Math.min(1, Math.max(MINIMUM_SCALE, proportionalScale));
});

const hovering = ref(false);

const zoom = computed(() => 1 / mapState.zoom);
const position = computed(() => ImagePosition.fromWorld(carriage.position));
const length = carriage.size.x;
const width = carriage.size.y;
</script>

<template>
	<div
		class="group absolute flex origin-center items-center justify-center"
		:class="mapZoom.zoomedIn ? 'gap-2' : 'gap-0'"
		:style="{
			top: position.y + 'px',
			left: position.x + 'px',
			rotate: carriage.rotation + 'deg',
			height: width,
			// scale: zoom,
		}"
		@click="emit('select')"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			preserveAspectRatio="none"
			class="overflow-visible stroke-zinc-950 stroke-2"
			:width="length"
			:height="10"
			:viewBox="`0 0 ${length} 10`"
			:style="{
				scale: 0.5,
			}"
			@mouseover="hovering = true"
			@mouseout="hovering = false"
		>
			<path
				:d="`M${length} 7L${length - 2} 10L11 10L8 5L11 -3.57628e-07L${length - 2} -3.57628e-07L${length} 3V7Z`"
				:fill="getPlayerColor(player)"
			/>
			<path
				:d="`M0 5L2.5 -3.57628e-07H11L8.5 5L11 10H2.5L0 5Z`"
				fill="#EDD210"
			/>
		</svg>
	</div>
</template>
