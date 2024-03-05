import RoutineItem from "./RoutineItem";
import "./App.css";

export default function Routine() {
  return (
    <div>
      <h1 className="module-header">Routine</h1>
      <RoutineItem name="Exercise" />
    </div>
  );
}
