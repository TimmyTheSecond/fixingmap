<script setup lang="ts">
import { useSnackbar } from "../composables/snackbar";
import { Icon } from "@iconify/vue";
const { current } = useSnackbar();
</script>

<template>
	<Transition
		enter-from-class="-translate-y-[150%]"
		enter-active-class="duration-300"
		leave-to-class="-translate-y-[150%]"
		leave-active-class="duration-300"
	>
		<div
			class="flex px-4 py-3 rounded-2xl bg-zinc-900 text-zinc-200 items-center gap-2 text-xl ring-inset ring ring-white/10 transition-transform"
			v-if="current"
		>
			<Icon
				:icon="current?.icon ?? 'material-symbols:info'"
				:color="current?.color"
				:class="['text-[22px]', current?.iconClass]"
			/>
			<p :style="`color: ${current?.color}`">{{ current?.text }}</p>
		</div>
	</Transition>
</template>
