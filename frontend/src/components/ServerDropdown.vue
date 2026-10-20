<script setup lang="ts">
// In the future, a Vue component library for Dovedale would be great, but I
// wanted to get this out within a month, not multiple.
import { computed, ref, Transition, useTemplateRef } from "vue";
import { useServerStore } from "../composables/server-state";
import { Icon } from "@iconify/vue";
import ServerDropdownItem from "./ServerDropdownItem.vue";
const serverState = useServerStore();

const menuOpen = ref(false);
const searchInput = useTemplateRef("search");
const filter = ref("");
const filteredServers = computed(() => {
	if (filter.value.trim() == "") return serverState.servers;
	return serverState.servers.filter((server) =>
		server.shortId?.includes(filter.value),
	);
});

const totalPlayerCount = computed(() =>
	serverState.servers.reduce(
		(total, server) => total + server.players.length,
		0,
	),
);

function toggleMenu() {
	menuOpen.value = !menuOpen.value;
	if (menuOpen.value) {
		setTimeout(() => searchInput.value?.focus());
	}
}
</script>

<template>
	<div class="flex w-64 flex-col gap-1.5 text-lg">
		<button
			class="flex cursor-pointer items-center justify-between rounded-xl bg-zinc-900/90 px-3 py-2 transition-colors duration-150 select-none hover:bg-zinc-800/90"
			@click="toggleMenu"
		>
			<div class="flex items-center gap-2">
				{{ serverState.currentServer?.shortId ?? "All Servers" }}
				<div class="flex items-center gap-1 text-base text-zinc-400">
					{{ serverState.currentServer?.players.length ?? totalPlayerCount }}
					<!-- not outlined as it's too small -->
					<Icon icon="material-symbols:group" />
				</div>
			</div>
			<Icon icon="material-symbols:keyboard-arrow-up" class="text-2xl" />
		</button>
		<Transition
			enter-active-class="duration-100 ease-out"
			enter-from-class="opacity-0"
			enter-to-class="opacity-100"
			leave-active-class="duration-100 ease-in"
			leave-from-class="opacity-100"
			leave-to-class="opacity-0"
		>
			<div
				v-if="menuOpen"
				class="flex w-full flex-col rounded-xl bg-zinc-900/90"
			>
				<input
					v-model="filter"
					ref="search"
					class="text flex w-full flex-col py-2 pr-2.5 pl-3.5 placeholder:text-zinc-500 focus:outline-none"
					type="text"
					placeholder="Search..."
				/>
				<div class="h-px w-full bg-zinc-700"></div>
				<div class="flex w-full flex-col gap-0.5 p-1">
					<ServerDropdownItem
						label="All Servers"
						:player-count="totalPlayerCount"
						:selected="serverState.currentServer === null"
						@click="
							serverState.currentServer = null;
							toggleMenu();
						"
					/>
					<ServerDropdownItem
						v-for="server in filteredServers"
						:label="server.shortId"
						:player-count="server.players.length"
						:selected="server === serverState.currentServer"
						@click="
							serverState.currentServer = server;
							toggleMenu();
						"
					/>
				</div>
			</div>
		</Transition>
	</div>
</template>
