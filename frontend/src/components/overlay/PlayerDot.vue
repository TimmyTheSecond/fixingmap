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
			'group absolute flex origin-[left_center] items-center',
			isMediumZoom ? 'gap-2' : 'gap-0',
		]"
		:style="{
			top: position.y,
			left: position.x - (SIZE / 2) * zoom,
			scale: zoom,
		}"
		@mouseover="hovering = true"
		@mouseout="hovering = false"
		@click="emit('select')"
	>
		<div
			:class="[
				'size-9 rounded-full border-4 border-zinc-950 group-hover:border-blue-500',
				selected ? 'outline-2 outline-blue-500' : '',
			]"
			:style="{
				scale: isMediumZoom || selected ? 1 : 0.5,
				backgroundColor: getPlayerColor(player),
			}"
		></div>
		<div
			class="flex flex-col rounded-lg bg-zinc-950/60 px-1.5 py-1 text-lg"
			v-if="isMediumZoom || hovering"
		>
			<div
				v-if="
					player.displayName !== player.username &&
					(isSmallZoom || hovering || selected)
				"
				class="flex items-center gap-1 text-sm text-zinc-400"
			>
				<Icon icon="material-symbols:person-outline" class="text-base" />
				{{ player.username }}
			</div>
			<p class="text-xl">{{ player.displayName }}</p>
		</div>
	</div>
</template>
