import "./App.css";
import { useLocalStorage } from "./Hooks";

type RoutineItemStorageType = "none" | "half" | "full";

interface RoutineItemsProps {
  name: string;
}

export default function RoutineItem({ name }: RoutineItemsProps) {
  const [completionVal, setCompletionVal] =
    useLocalStorage<RoutineItemStorageType>(name, "none");
  return (
    <div>
      <p>{name}</p>
      <button
        onClick={() => {
          if (completionVal == "none") {
            setCompletionVal("half");
          } else if (completionVal == "half") {
            setCompletionVal("full");
          } else {
            setCompletionVal("none");
          }
        }}
      >
        {completionVal}
      </button>
    </div>
  );
}
