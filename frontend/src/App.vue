<script setup lang="ts">
import Map from "./components/Map.vue";
import Snackbar from "./components/Snackbar.vue";
import { useMapStore } from "./composables/map-state";

const store = useMapStore();
if (import.meta.env.DEV) {
	document.title = "Dovedale Live Map (dev)";
}
</script>

<template>
	<div class="overflow-hidden h-screen z-1 text-zinc-200">
		<div class="fixed top-0 z-20 flex w-full justify-center p-6">
			<Snackbar />
		</div>
		<div class="fixed top-0 right-0 z-20 flex justify-center p-6">
			Zoom: {{ store.zoom.toFixed(2) }}
		</div>
		<Map class="fixed top-0 left-0 z-0" />
	</div>
</template>
