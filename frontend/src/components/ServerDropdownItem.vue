<script setup lang="ts">
import { Icon } from "@iconify/vue";

defineProps<{
	playerCount: number;
	label: string;
	selected: boolean;
}>();
const emit = defineEmits<{
	click: [];
}>();
</script>

<template>
	<button
		:class="[
			'flex items-center gap-2 rounded-md px-2.5 py-1.5 transition-colors duration-150 hover:bg-zinc-700/50',
			selected ? 'bg-zinc-700/80' : '',
		]"
		@click="emit('click')"
	>
		{{ label }}
		<div class="flex items-center gap-1 text-base text-zinc-400">
			{{ playerCount }}
			<Icon icon="material-symbols:group" />
		</div>
	</button>
</template>
