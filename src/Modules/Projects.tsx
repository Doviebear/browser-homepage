import { useState } from "react";
import "../App.css";
import ProjectItem from "../Components/ProjectItem";
import { useLocalStorage } from "../Hooks";

export default function Projects() {
  const [projectNames, setProjectNames, _deleteProjectNames] = useLocalStorage<
    string[]
  >("project-names", []);
  const [addingProject, setAddingProject] = useState(false);

  const addingInputKeypress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (e.key == "Enter" && target.value !== "") {
      setAddingProject(false);
      setProjectNames([...projectNames, target.value]);
    }
  };

  const trashClick = (storageKey: string) => {
    setProjectNames(projectNames.filter((val: string) => val !== storageKey));
  };
  return (
    <div>
      <h1 className="module-header">Projects</h1>
      {projectNames.map((name: string) => {
        // console.log("name is " + name);
        return (
          <ProjectItem storageKey={name} key={name} trashClick={trashClick} />
        );
      })}
      <div className="projects-container">
        {addingProject && (
          <input
            className="projects-add-project-input"
            type="text"
            autoFocus
            onKeyDown={addingInputKeypress}
            onBlur={() => setAddingProject(false)}
          />
        )}
        <button
          className="projects-add-project"
          onClick={() => setAddingProject(true)}
        >
          + Add Project
        </button>
      </div>
    </div>
  );
}
