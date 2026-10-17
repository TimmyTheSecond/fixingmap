import { ref } from "vue";
import type { Color } from "../utils/color";

export const DEFAULT_DURATION_MS = 2000;
export const TRANSITION_DURATION_MS = 200;

export interface SnackbarOptions {
	text: string;
	/** An Iconify icon name, e.g. `material-symbols:info` */
	icon: string;
	/** Classes to apply to the icon element, e.g. `animate-spin` */
	iconClass?: string;
	color: Color;
	/** Provide -1 to be permanent until `dismiss()` is ran */
	duration?: number;
}

const current = ref<SnackbarOptions | null>(null);

export function useSnackbar() {
	function dismiss() {
		current.value = null;
	}

	return {
		show: (options: Omit<SnackbarOptions, "visible">) => {
			current.value = options;

			if (options?.duration !== -1) {
				setTimeout(() => {
					if (current.value?.text !== options.text) return;
					dismiss();
				}, options?.duration ?? DEFAULT_DURATION_MS);
			}
		},
		dismiss,
		current,
	};
}
