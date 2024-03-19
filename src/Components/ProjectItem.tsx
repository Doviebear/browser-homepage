import { useContext, useState } from "react";
import "../App.css";
import { useLocalStorage } from "../Hooks";
import { TrashContext } from "../Pages/App";
import AddLinkToProjectItem from "./AddLinkToProjectItem";

interface ProjectItemProps {
  storageKey: string;
  trashClick: (storageKey: string) => void;
}

interface LinkData {
  name: string;
  link: string;
}

interface ProjectData {
  name: string;
  links: LinkData[];
}

export default function ProjectItem({
  storageKey,
  trashClick,
}: ProjectItemProps) {
  const trashMode = useContext(TrashContext);
  const [addingLink, setAddingLink] = useState(false);
  const [projectData, setProjectData, deleteProjectData] =
    useLocalStorage<ProjectData>(storageKey, {
      name: storageKey,
      links: [],
    });
  const interleavedLinkData = projectData.links
    .flatMap((e: LinkData) => [e, { name: "filler", link: "" }])
    .slice(0, -1);
  const addLink = (name: string, link: string) => {
    setProjectData({
      ...projectData,
      links: [...projectData.links, { name, link }],
    });
    setAddingLink(false);
  };
  return (
    <div className="project-item">
      <h2
        className={`project-item-title ${
          trashMode ? "project-item-trash" : ""
        }`}
        onClick={() => {
          if (trashMode) {
            deleteProjectData();
            trashClick(storageKey);
          }
        }}
      >
        {projectData.name}
      </h2>
      <div className="project-item-links">
        {interleavedLinkData.map((linkData: LinkData) => {
          if (linkData.name == "filler") {
            return " — ";
          } else {
            return (
              <a
                href={linkData.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-item-link"
                key={linkData.name}
              >
                {linkData.name}
              </a>
            );
          }
        })}
        {projectData.links.length < 2 && (
          <div className="project-item-link-add-container">
            <button
              className="add-link-button "
              onClick={() => {
                setAddingLink(true);
              }}
            >
              + Add Link
            </button>
            {addingLink && (
              <AddLinkToProjectItem
                accept={addLink}
                close={() => setAddingLink(false)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
