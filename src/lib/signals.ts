import { computed, signal } from "@preact/signals";
import { colors } from "./data";

export const clues = signal<readonly string[]>([]);

export const clueIndex = signal(0);

export const clue = computed(() => {
  return clues.value[clueIndex.value];
});

export const color = signal(colors[0]);
