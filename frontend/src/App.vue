<script setup lang="ts">
import { Icon } from "@iconify/vue";
import Map from "./components/Map.vue";
import ServerDropdown from "./components/ServerDropdown.vue";
import Snackbar from "./components/Snackbar.vue";
import { useServerStore } from "./composables/server-state";
import { computed } from "vue";
const serverState = useServerStore();

const joinUrl = computed(() => {
	const params = new URLSearchParams();
	params.append("placeId", "12018816388");
	if (serverState.currentServer)
		params.append("gameInstanceId", serverState.currentServer.longId);
	return "roblox://experiences/start?" + params.toString();
});

if (import.meta.env.DEV) {
	document.title = "Dovedale Live Map (dev)";
}
</script>

<template>
	<div class="overflow-hidden h-screen z-1 text-zinc-200">
		<div class="fixed top-0 z-20 flex w-full justify-center p-4">
			<Snackbar />
		</div>
		<div class="fixed top-0 left-0 z-20 flex gap-2 p-4">
			<ServerDropdown />
			<a
				class="p-2 bg-zinc-900/90 hover:bg-zinc-800/90 rounded-xl cursor-pointer h-fit"
				:href="joinUrl"
			>
				<Icon icon="material-symbols:arrow-outward" class="text-[28px]" />
			</a>
		</div>
		<Map class="fixed top-0 left-0 z-0" />
	</div>
</template>
