import { FunctionalComponent, h } from "preact";
import { useEffect } from "preact/hooks";
import { populateClues } from "../lib/game";
import { ClueDisplay } from "./clue-display";
import { DrawPad } from "./draw-pad";

const App: FunctionalComponent = () => {
  useEffect(() => {
    populateClues();
  }, []);

  return (
    <div id="app">
      <h1>DrawIt!</h1>
      <ClueDisplay />
      <DrawPad />
    </div>
  );
};

export default App;
