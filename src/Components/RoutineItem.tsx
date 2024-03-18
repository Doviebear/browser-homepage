import "../App.css";
import { useLocalStorage } from "../Hooks";

type RoutineItemStorageType = "none" | "half" | "full";

interface RoutineItemsProps {
  name: string;
}

export default function RoutineItem({ name }: RoutineItemsProps) {
  const [completionVal, setCompletionVal] =
    useLocalStorage<RoutineItemStorageType>(name, "none");
  return (
    <div className="routine-item">
      <p className="routine-item-name">{name}</p>
      <button
        className={`routine-button ${
          completionVal == "half"
            ? "routine-button-half"
            : completionVal == "full"
            ? "routine-button-full"
            : ""
        }`}
        onClick={() => {
          if (completionVal == "none") {
            setCompletionVal("half");
          } else if (completionVal == "half") {
            setCompletionVal("full");
          } else {
            setCompletionVal("none");
          }
        }}
      ></button>
    </div>
  );
}
