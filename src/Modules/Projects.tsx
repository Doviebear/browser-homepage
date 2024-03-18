import "../App.css";
import ProjectItem from "../Components/ProjectItem";
import { useLocalStorage } from "../Hooks";

export default function Projects() {
  const [projectNames, _] = useLocalStorage<string[]>("project-names", []);
  return (
    <div>
      <h1 className="module-header">Projects</h1>
      {projectNames.map((name: string) => {
        console.log("name is " + name);
        return <ProjectItem storageKey={name} />;
      })}
      {/* <button onClick={() => setProjectNames([...projectNames, "New Project"])}>
        + Add Project
      </button> */}
    </div>
  );
}
