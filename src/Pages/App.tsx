import Projects from "../Modules/Projects";
import Routine from "../Modules/Routine";
import "../App.css";
import { createContext, useState } from "react";
import { format } from "date-fns";
import { useLocalStorage } from "../Hooks";

export const TrashContext = createContext(false);

function App() {
  const [goalInputText, setGoalInputText] = useLocalStorage<string>(
    "goalInputText",
    ""
  );
  const [trashMode, setTrashMode] = useState(false);
  return (
    <div className="root-div">
      <div>
        <h1 className="quote">
          &quot;Life before Death, Strength before Weakness, Journey before
          Destination.&quot;
        </h1>
      </div>
      <div>
        <h2 className="date-header">
          <span className="lighter-text">Today is</span>{" "}
          {format(new Date(), "EEEE', 'LLLL do'. '")} What is your goal for
          today?
        </h2>
        <textarea
          className={`goal-input ${goalInputText ? "goal-input-filled" : ""}`}
          placeholder="Your one little teeny tiny goal goes here."
          wrap="hard"
          onFocus={(e) => (e.target.placeholder = "")}
          onBlur={(e) =>
            (e.target.placeholder =
              "Your one little teeny tiny goal goes here.")
          }
          value={goalInputText}
          onChange={(e) => {
            if ((e.target.value.match(/\n/g) || []).length == 3) {
              return;
            } else {
              setGoalInputText(e.target.value);
            }
          }}
          rows={3}
          cols={60}
        ></textarea>
      </div>
      <div className="module-container">
        <TrashContext.Provider value={trashMode}>
          <Projects />
          <Routine />
        </TrashContext.Provider>
      </div>
      <button
        className={`trash-button ${trashMode ? "trash-button-active" : ""}`}
        onClick={() => setTrashMode(!trashMode)}
      >
        Trash
      </button>
    </div>
  );
}

export default App;
