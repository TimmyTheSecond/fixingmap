<script setup lang="ts">
// TODO: abstract logic shared with PlayerDot
import { computed, ref, watch } from "vue";
import { getPlayerColor, type Player } from "../../utils/players";
import { ImagePosition, Vector2 } from "../../utils/positions";
import { useMapStore, useMapZoom } from "../../composables/map-state";
import { Icon } from "@iconify/vue";

const SIZE = 36;
const MAX_SCALE_ZOOM = 0.6;
const MINIMUM_SCALE = 0.5;

const mapZoom = useMapZoom();
const mapState = useMapStore();
const emit = defineEmits<{ select: [] }>();
const props = defineProps<{
	players: Player[];
	selected: boolean;
	flip: boolean;
}>();

const hovering = ref(false);
const zoom = computed(() => 1 / mapState.zoom);
const position = computed(() => {
	const averagePosition = Vector2.average(
		props.players.map((player) => player.position),
	);
	return ImagePosition.fromWorld(averagePosition);
});
const dotScale = computed(() => {
	const proportionalScale = mapState.zoom / MAX_SCALE_ZOOM;
	return Math.min(1, Math.max(MINIMUM_SCALE, proportionalScale));
});
</script>

<template>
	<div
		:class="[
			'group absolute flex items-center justify-center',
			mapZoom.zoomedIn.value ? 'gap-6' : 'gap-2',
			flip ? 'origin-[right_center] flex-row-reverse' : 'origin-[left_center]',
		]"
		:style="{
			top: position.y + 'px',
			left: position.x + (flip ? 1 : -1) * (SIZE / 2) * zoom + 'px',
			scale: zoom,
			translate: `${flip ? '-100%' : '0'} -50%`,
		}"
		@click="emit('select')"
	>
		<div
			class="flex size-8 flex-wrap items-center justify-center gap-0"
			:style="{ scale: selected ? 1 : dotScale }"
			@mouseover="hovering = true"
			@mouseout="hovering = false"
		>
			<div
				v-for="[index, player] in players.length > 4
					? players.slice(0, 3).entries()
					: players.entries()"
				class="flex size-4 items-center justify-center"
			>
				<div
					class="size-9 min-w-9 rounded-full border-4 border-zinc-950"
					:style="{
						backgroundColor: getPlayerColor(player),
						zIndex: index + 10,
					}"
				></div>
			</div>
			<div
				v-if="players.length > 4"
				class="flex size-4 items-center justify-center"
			>
				<div
					class="z-20 -m-2 flex size-9 min-w-9 items-center justify-center rounded-full bg-zinc-950/80 text-lg"
				>
					+{{ players.length - 3 }}
				</div>
			</div>
		</div>
		<div
			v-if="mapZoom.zoomedIn.value || hovering"
			class="flex flex-col rounded-lg bg-zinc-950/60 px-2 py-1.5 text-lg"
		>
			<div
				class="flex gap-2"
				v-for="player in players.length > 4 &&
				!(mapZoom.zoomedInFar.value || hovering || selected)
					? players.slice(0, 3)
					: players"
				:key="player.userId"
			>
				<p class="text-xl">{{ player.displayName }}</p>
				<div
					v-if="
						player.displayName !== player.username &&
						(mapZoom.zoomedInFar.value || hovering || selected)
					"
					class="flex items-center gap-1 text-sm text-zinc-400"
				>
					<Icon icon="material-symbols:person-outline" class="text-base" />
					{{ player.username }}
				</div>
			</div>
			<div
				v-if="
					players.length > 4 &&
					!(mapZoom.zoomedInFar.value || hovering || selected)
				"
				class="text-zinc-400"
			>
				+ {{ players.length - 3 }} others
			</div>
		</div>
	</div>
</template>
