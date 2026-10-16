<script setup lang="ts">
import { computed } from "vue";
import type { Player } from "../../utils/players";
import { ImagePosition } from "../../utils/positions";
import { useMapStore } from "../../composables/map-state";

const mapState = useMapStore();

const SIZE = 32;
const SMALL_THRESHOLD = 0.6;

const props = defineProps<{
	player: Player;
}>();

const isSmall = computed(() => mapState.zoom < SMALL_THRESHOLD);
const zoom = computed(() => 1 / mapState.zoom);
const position = computed(() => ImagePosition.fromWorld(props.player.position));
</script>

<template>
	<div
		class="flex gap-2 absolute origin-left"
		:style="`top: ${position.y}px; left: ${position.x - (SIZE / 2) * zoom}px; scale: ${zoom}`"
	>
		<div
			class="rounded-full w-8 h-8 outline-4 outline-zinc-950 bg-[#02B857]"
			:style="`scale: ${isSmall ? 0.5 : 1}`"
		></div>
		<div
			class="flex px-1.5 py-1 gap-2 rounded-lg text-lg bg-zinc-900/60"
			v-if="!isSmall"
		>
			Dog
		</div>
	</div>
</template>
