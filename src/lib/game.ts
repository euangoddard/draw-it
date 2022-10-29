import { CLUES } from "./data";
import { clueIndex, clues } from "./signals";
import { shuffled } from "./utils";

export const populateClues = () => {
  clues.value = shuffled(CLUES);
  clueIndex.value = 0;
};

export const moveToNextClue = () => {
  clueIndex.value = (clueIndex.value + 1) % CLUES.length;
};
