import { ref } from "vue";
import type { Color } from "../utils/color";

export const DEFAULT_DURATION_MS = 5000;
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
	visible: boolean;
}

export function useSnackbar() {
	const current = ref<SnackbarOptions | null>(null);

	function dismiss() {
		if (!current.value) return;
		current.value.visible = false;

		setTimeout(() => {
			current.value = null;
		}, TRANSITION_DURATION_MS);
	}

	return {
		show: (options: Omit<SnackbarOptions, "visible">) => {
			current.value = {
				...options,
				visible: true,
			};
			console.log(current.value);

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
