<script setup lang="ts">
import { onMounted, ref } from "vue";
import { MAP_IMAGE_SIZE } from "../constants";
import createPanZoom from "panzoom";

const zoomParent = ref<HTMLDivElement>();
const zoom = ref<HTMLImageElement>();

onMounted(async () => {
	if (!zoom.value || !zoomParent.value)
		throw new Error("Could not find image or picture element");
	createPanZoom(zoom.value, {
		maxZoom: 10,
		minZoom: 0.05,
		initialZoom: 0.067,
		smoothScroll: false,
	});

	await zoom.value.decode();
	zoom.value.style.backgroundImage = "";
});
</script>

<template>
	<picture ref="zoomParent" class="select-none overflow-hidden h-screen">
		<source type="image/avif" srcset="/src/assets/map.avif" />
		<img
			ref="zoom"
			class="max-w-none bg-cover"
			style="background-image: url(/src/assets/map-small.png)"
			src="/src/assets/map.png"
			:width="MAP_IMAGE_SIZE.x"
			:height="MAP_IMAGE_SIZE.y"
		/>
	</picture>
</template>

<!-- <VueZoomable
		ref="zoomer"
		class="w-full h-screen flex overflow-clip"
		:min-zoom="1"
		:max-zoom="50"
		:enable-control-button="false"
		zoom-origin="pointer"
		selector="#map-image"
		v-model:zoom="zoom"
	>
	</VueZoomable> -->
