import { FunctionalComponent, h } from "preact";
import { colors } from "../../lib/data";
import { color } from "../../lib/signals";
import style from "./style.css";

export const ColorPicker: FunctionalComponent = () => {
  return (
    <div class={style.colorChoices}>
      {colors.map((col) => {
        return (
          <button
            type="button"
            key={col}
            className={style.colorChoice}
            style={{ "--bg": col }}
            aria-label={col}
            onClick={() => (color.value = col)}
          >
            {col === color.value ? "✓" : ""}
          </button>
        );
      })}
    </div>
  );
};
