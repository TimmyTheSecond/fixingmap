<script setup lang="ts">
const model = defineModel<boolean>({ required: true });
const props = defineProps<{
	name: string;
}>();
</script>

<template>
	<button @click="model = !model" class="cursor-pointer p-1.5">
		<div
			class="flex h-fit w-10 rounded-full p-0.5 transition-colors duration-200"
			:class="model ? 'bg-blue-500' : 'justify-start bg-zinc-700'"
		>
			<div
				class="size-4.5 rounded-full bg-zinc-900 transition-transform"
				:class="model ? 'translate-x-4.5' : ''"
			></div>
		</div>
	</button>
</template>
