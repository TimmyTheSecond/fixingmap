<script setup lang="ts">
// In the future, a Vue component library for Dovedale would be great, but I
// wanted to get this out within a month, not multiple.
import { computed, ref, Transition, useTemplateRef } from "vue";
import { useServerStore } from "../composables/server-state";
import { Icon } from "@iconify/vue";
const serverState = useServerStore();

const menuOpen = ref(false);
const searchInput = useTemplateRef("search");
const filter = ref("");
const filteredServers = computed(() =>
	serverState.servers.filter((server) =>
		server.shortId?.includes(filter.value),
	),
);
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
	<div class="flex flex-col gap-1.5 w-64 text-lg">
		<button
			class="flex items-center justify-between px-3 py-2 rounded-xl select-none bg-zinc-900/90 transition-colors duration-150 hover:bg-zinc-800/90"
			@click="toggleMenu"
		>
			<div class="flex gap-2 items-center">
				{{ serverState.currentServer?.shortId ?? "All Servers" }}
				<div class="flex gap-1 items-center text-base text-zinc-400">
					{{
						serverState.currentServer?.players.length ?? totalPlayerCount
					}}
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
				class="flex flex-col w-full bg-zinc-900/90 rounded-xl"
			>
				<input
					v-model="filter"
					ref="search"
					class="flex flex-col pl-3.5 pr-2.5 py-2 w-full text placeholder:text-zinc-500 focus:outline-none"
					type="text"
					placeholder="Search..."
				/>
				<div class="w-full h-px bg-zinc-700"></div>
				<div class="flex flex-col p-1 w-full">
					<button
						:class="[
							'flex gap-2 px-2.5 py-1.5 items-center transition-colors duration-150 hover:bg-zinc-700/50 rounded-md',
							serverState.currentServer === null ? 'bg-zinc-700/80' : '',
						]"
						@click="
							serverState.currentServer = null;
							toggleMenu();
						"
					>
						All Servers
						<div class="flex gap-1 items-center text-base text-zinc-400">
							{{ totalPlayerCount }}
							<Icon icon="material-symbols:group" />
						</div>
					</button>
					<button
						v-for="server in filteredServers"
						:class="[
							'flex gap-2 px-2.5 py-1.5 items-center transition-colors duration-150 hover:bg-zinc-700/50 rounded-md',
							server === serverState.currentServer
								? 'bg-zinc-700/80'
								: '',
						]"
						@click="
							serverState.currentServer = server;
							toggleMenu();
						"
					>
						{{ server.shortId }}
						<div class="flex gap-1 items-center text-base text-zinc-400">
							{{ server.players.length }}
							<Icon icon="material-symbols:group" />
						</div>
					</button>
				</div>
			</div>
		</Transition>
	</div>
</template>
