import { batch, useSignal } from "@preact/signals";
import { FunctionalComponent, h, Fragment } from "preact";
import { moveToNextClue } from "../../lib/game";
import { clue } from "../../lib/signals";
import style from "./style.css";

export const ClueDisplay: FunctionalComponent = () => {
  const isVisible = useSignal(true);

  return (
    <section class={style.clue}>
      {isVisible.value ? (
        <>
          <button
            type="button"
            class="button"
            onClick={() => (isVisible.value = false)}
          >
            Hide
          </button>
          <span class={style.clueText}>{clue}</span>
        </>
      ) : (
        <>
          <button
            type="button"
            class="button"
            onClick={() => (isVisible.value = true)}
          >
            Show
          </button>
          <span class={style.clueText}>
            <em class={style.clueHidden}>clue hidden</em>
          </span>
        </>
      )}
      <button
        type="button"
        class="button"
        onClick={() => {
          batch(() => {
            moveToNextClue();
            isVisible.value = true;
          });
        }}
      >
        Next
      </button>
    </section>
  );
};
