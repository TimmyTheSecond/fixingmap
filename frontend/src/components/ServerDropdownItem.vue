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
			'flex gap-2 px-2.5 py-1.5 items-center transition-colors duration-150 hover:bg-zinc-700/50 rounded-md',
			selected ? 'bg-zinc-700/80' : '',
		]"
		@click="emit('click')"
	>
		{{ label }}
		<div class="flex gap-1 items-center text-base text-zinc-400">
			{{ playerCount }}
			<Icon icon="material-symbols:group" />
		</div>
	</button>
</template>
