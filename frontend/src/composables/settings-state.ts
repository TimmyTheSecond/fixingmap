import { defineStore } from "pinia";
import { reactive, ref, watch } from "vue";
import { z } from "zod";

const settingsSchema = z.strictObject({
	showInfoOnZoom: z.boolean(),
	showDetailsOnZoom: z.boolean(),
	groupPlayers: z.boolean(),
});

export type Settings = z.infer<typeof settingsSchema>;

export const defaultSettings: Settings = {
	showInfoOnZoom: true,
	showDetailsOnZoom: true,
	groupPlayers: true,
};

export const useSettingsStore = defineStore("settings", () => {
	let settings = defaultSettings;
	const stored = localStorage.getItem("settings");
	if (stored) {
		try {
			settings = settingsSchema.parse(JSON.parse(stored));
		} catch {}
	}

	watch(settings, () => {
		localStorage.setItem("settings", JSON.stringify(settings));
	});

	return {
		showSettings: ref(false),
		settings: reactive<Settings>(settings),
		reset() {
			Object.assign(defaultSettings, settings);
		},
	};
});
