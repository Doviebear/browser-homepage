import { useContext } from "react";
import "../App.css";
import { useLocalStorage } from "../Hooks";
import { TrashContext } from "../Pages/App";

type RoutineItemStorageType = "none" | "half" | "full";

interface RoutineItemsProps {
  name: string;
  trashClick: (name: string) => void;
}

export default function RoutineItem({ name, trashClick }: RoutineItemsProps) {
  const trashMode = useContext(TrashContext);
  const [completionVal, setCompletionVal, deleteCompletionVal] =
    useLocalStorage<RoutineItemStorageType>(name, "none");

  return (
    <div className="routine-item">
      <p
        className={`routine-item-name ${trashMode ? "routine-item-trash" : ""}`}
        onClick={() => {
          if (trashMode) {
            deleteCompletionVal();
            trashClick(name);
          }
        }}
      >
        {name}
      </p>
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
