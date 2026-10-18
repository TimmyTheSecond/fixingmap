import { onMounted, onUnmounted, ref } from "vue";

const height = ref(window.innerHeight);
const width = ref(window.innerWidth);

export default function useWindowSize() {
	return { height, width };
}

function update() {
	height.value = window.innerHeight;
	width.value = window.innerWidth;
}

onMounted(() => document.addEventListener("resize", update));
onUnmounted(() => document.removeEventListener("resize", update));
