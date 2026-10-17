<script setup lang="ts">
import { computed, ref } from "vue";
import { getPlayerColor, type Player } from "../../utils/players";
import { ImagePosition } from "../../utils/positions";
import { useMapStore } from "../../composables/map-state";
import { Icon } from "@iconify/vue";

const SIZE = 32;

const mapState = useMapStore();

const emit = defineEmits<{ select: [] }>();
const props = defineProps<{
	player: Player;
	selected: boolean;
}>();

const hovering = ref(false);
const isMediumZoom = computed(() => mapState.zoom > 0.6);
const isSmallZoom = computed(() => mapState.zoom > 2);
const zoom = computed(() => 1 / mapState.zoom);
const position = computed(() => ImagePosition.fromWorld(props.player.position));
</script>

<template>
	<div
		:class="[
			'flex absolute origin-[left_center] items-center group',
			isMediumZoom ? 'gap-2' : 'gap-0',
		]"
		:style="`top: ${position.y}px; left: ${position.x - (SIZE / 2) * zoom}px; scale: ${zoom}; translate: 0 -50%;`"
		@mouseover="hovering = true"
		@mouseout="hovering = false"
		@click="emit('select')"
	>
		<div
			:class="[
				'rounded-full size-9 border-4 border-zinc-950 group-hover:border-blue-500',
				selected ? 'outline-2 outline-blue-500' : '',
			]"
			:style="`scale: ${isMediumZoom || selected ? 1 : 0.5}; background-color: ${getPlayerColor(player)};`"
		></div>
		<div
			class="flex flex-col px-1.5 py-1 rounded-lg text-lg bg-zinc-950/60"
			v-if="isMediumZoom || hovering"
		>
			<div
				v-if="
					player.displayName !== player.username &&
					(isSmallZoom || hovering || selected)
				"
				class="flex items-center gap-1 text-zinc-400 text-sm"
			>
				<Icon icon="material-symbols:person-outline" class="text-base" />
				{{ player.username }}
			</div>
			<p class="text-xl">{{ player.displayName }}</p>
		</div>
	</div>
</template>
