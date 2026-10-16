<script setup lang="ts">
import { watch } from "vue";
import { useSnackbar } from "../composables/snackbar";
import { Icon } from "@iconify/vue";
const { current } = useSnackbar();
watch(current, console.log);
</script>

<template>
	<!-- v-if="current" -->
	<div
		:class="{
			'flex px-4 py-3 rounded-2xl bg-zinc-900 text-zinc-200 items-center gap-2 text-xl ring-inset ring ring-white/10 transition-transform duration-200': true,
			'-translate-y-19': !current?.visible,
		}"
	>
		<Icon
			:icon="current?.icon"
			:color="current?.color"
			:class="['text-[22px]', current?.iconClass]"
		/>
		<p :style="`color: ${current?.color}`">{{ current?.text }}</p>
	</div>
</template>
