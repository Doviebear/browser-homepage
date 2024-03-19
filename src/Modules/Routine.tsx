import RoutineItem from "../Components/RoutineItem";
import "../App.css";
import { useLocalStorage } from "../Hooks";
import { useState } from "react";

export default function Routine() {
  const [addingRoutine, setAddingRoutine] = useState(false);
  const [routines, setRoutines, _deleteRoutines] = useLocalStorage<string[]>(
    "routines",
    []
  );

  const addingInputKeypress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (e.key == "Enter" && target.value !== "") {
      setAddingRoutine(false);
      setRoutines([...routines, target.value]);
    }
  };

  const trashClick = (name: string) => {
    setRoutines(routines.filter((val: string) => val !== name));
  };
  return (
    <div>
      <h1 className="module-header">Routine</h1>
      <div className="routines-container">
        {routines.map((routineStr: string) => (
          <RoutineItem
            name={routineStr}
            key={routineStr}
            trashClick={trashClick}
          />
        ))}
        {addingRoutine && (
          <input
            className="routines-add-routine-input"
            type="text"
            autoFocus
            onKeyDown={addingInputKeypress}
            onBlur={() => setAddingRoutine(false)}
          />
        )}
        <button
          className="routines-add-routine"
          onClick={() => setAddingRoutine(true)}
        >
          + Add Routine
        </button>
      </div>
    </div>
  );
}
