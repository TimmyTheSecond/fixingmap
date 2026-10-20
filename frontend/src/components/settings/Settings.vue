<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useSettingsStore } from "../../composables/settings-state";
import { toRefs } from "vue";
import SettingsToggle from "./SettingsToggle.vue";
const settingsState = useSettingsStore();

function formatName(name: string): string {
	const words = name
		.replace(/([A-Z])/g, " $1")
		.toLowerCase()
		.trim();
	return words.charAt(0).toUpperCase() + words.slice(1);
}
</script>

<template>
	<div
		class="fixed right-0 bottom-0 z-20 flex flex-1 flex-col items-end gap-2 p-4"
	>
		<div
			class="flex w-xs flex-col gap-1 rounded-4xl bg-zinc-900 p-5 pt-4 shadow-xl/15"
			v-if="settingsState.showSettings"
		>
			<div class="flex items-center justify-between text-[28px] font-semibold">
				Settings
				<button
					class="cursor-pointer"
					@click="settingsState.showSettings = false"
				>
					<Icon icon="material-symbols:close" class="text-[32px]" />
				</button>
			</div>

			<div class="flex w-full flex-col">
				<div
					v-for="[name, setting] in Object.entries(
						toRefs(settingsState.settings),
					)"
					class="flex w-full items-center justify-between"
				>
					{{ formatName(name) }}
					<SettingsToggle v-model="setting.value" :name="name" />
				</div>
			</div>
		</div>

		<button
			class="z-30 h-fit cursor-pointer rounded-xl bg-zinc-900/90 p-2 hover:bg-zinc-800/90"
			@click="settingsState.showSettings = !settingsState.showSettings"
		>
			<Icon icon="material-symbols:settings-outline" class="text-[28px]" />
		</button>
	</div>
</template>
