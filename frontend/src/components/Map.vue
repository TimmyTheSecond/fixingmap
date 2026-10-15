<script setup lang="ts">
import { onMounted, ref } from "vue";
import { MAP_IMAGE_SIZE } from "../constants";
import Panzoom from "@panzoom/panzoom";

const zoomParent = ref<HTMLDivElement>();
const zoom = ref<HTMLImageElement>();

onMounted(() => {
	const panzoom = Panzoom(zoom.value, {
		maxScale: 10,
		minScale: 0.05,
		startScale: 0.1,
		// startX: -192098,
		// startY: -153423,

		// cur
		canvas: true,
		contain: "outside",

		animate: true,
		duration: 50,
	});
	console.log(panzoom.getScale(), panzoom.getPan());

	zoomParent.value.addEventListener("wheel", panzoom.zoomWithWheel);
});
</script>

<template>
	<div ref="zoomParent" class="select-none overflow-hidden h-screen">
		<img ref="zoom" class="max-w-none" src="/src/assets/map.png" />
	</div>
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
