import { effect, signal } from "@preact/signals";
import classNames from "classnames";
import { FunctionalComponent, h } from "preact";
import { useEffect, useRef } from "preact/hooks";
import { clue, color } from "../../lib/signals";
import { ColorPicker } from "../color-picker";
import style from "./style.css";

const size = 360;
const figureBorder = 3;

const enum DrawingMode {
  Down,
  Move,
  Up,
}

interface Point {
  x: number;
  y: number;
}

interface PointMode extends Point {
  mode: DrawingMode;
}

const point = signal<PointMode>({ x: 0, y: 0, mode: DrawingMode.Up });
const offset = signal<Point>({ x: 0, y: 0 });

export const DrawPad: FunctionalComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const bounds = canvasRef.current?.getBoundingClientRect();
    if (bounds) {
      offset.value = { x: bounds.left, y: bounds.top };
    }
  }, []);

  const getCtx = (): CanvasRenderingContext2D | null => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return null;
    }
    return canvas.getContext("2d")!;
  };

  effect(() => {
    const ctx = getCtx();
    const { x, y, mode: drawingMode } = point.value;
    if (!ctx) {
      return;
    }
    if (drawingMode === DrawingMode.Down) {
      ctx.lineWidth = 5;
      ctx.lineJoin = "round";
      ctx.strokeStyle = color.peek();
      ctx.beginPath();
      ctx.moveTo(x, y);
    } else if (drawingMode === DrawingMode.Move) {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  });

  const clearPad = () => {
    const ctx = getCtx();
    ctx?.clearRect(0, 0, size, size);
  };

  effect(() => {
    // Ensure that we're subscribed to the clue signal to clear the pad
    console.log(clue.value);
    clearPad();
  });

  const endDrawing = (preventDefault: boolean) => (e: Event) => {
    if (preventDefault) {
      e.preventDefault();
    }
    point.value = {
      x: 0,
      y: 0,
      mode: DrawingMode.Up,
    };
  };

  return (
    <section>
      <ColorPicker />
      <figure
        style={{
          margin: "0 0 8px",
          padding: 0,
          border: `${figureBorder}px solid black`,
          width: `${size + 2 * figureBorder}px`,
        }}
      >
        <canvas
          ref={canvasRef}
          width={size}
          height={size}
          onMouseDown={(e: MouseEvent) => {
            point.value = {
              x: e.offsetX,
              y: e.offsetY,
              mode: DrawingMode.Down,
            };
          }}
          onMouseMove={(e: MouseEvent) => {
            if (point.peek().mode !== DrawingMode.Up) {
              point.value = {
                x: e.offsetX,
                y: e.offsetY,
                mode: DrawingMode.Move,
              };
            }
          }}
          onMouseUp={endDrawing(false)}
          onTouchStartCapture={(e: TouchEvent) => {
            e.preventDefault();
            const { x, y } = offset.peek();
            const firstTouch = e.changedTouches[0];
            point.value = {
              x: firstTouch.clientX - x,
              y: firstTouch.clientY - y,
              mode: DrawingMode.Down,
            };
          }}
          onTouchMoveCapture={(e: TouchEvent) => {
            e.preventDefault();
            if (point.peek().mode !== DrawingMode.Up) {
              const { x, y } = offset.peek();
              const firstTouch = e.changedTouches[0];
              point.value = {
                x: firstTouch.clientX - x,
                y: firstTouch.clientY - y,
                mode: DrawingMode.Move,
              };
            }
          }}
          onTouchEndCapture={endDrawing(true)}
          onTouchCancel={endDrawing(false)}
          onMouseLeave={endDrawing(false)}
        />
      </figure>
      <button
        class={classNames([style.resetButton, "button"])}
        type="button"
        onClick={() => clearPad()}
      >
        Clear drawing
      </button>
    </section>
  );
};
