import "../App.css";
import { useLocalStorage } from "../Hooks";

interface ProjectItemProps {
  storageKey: string;
}

interface LinkData {
  name: string;
  link: string;
}

interface ProjectData {
  name: string;
  links: LinkData[];
}

export default function ProjectItem({ storageKey }: ProjectItemProps) {
  const [projectData, _setProjectData] = useLocalStorage<ProjectData>(
    storageKey,
    {
      name: storageKey,
      links: [],
    }
  );
  const interleavedLinkData = projectData.links
    .flatMap((e: LinkData) => [e, { name: "filler", link: "" }])
    .slice(0, -1);
  return (
    <div className="project-item">
      <h2 className="project-item-title">{projectData.name}</h2>
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
              >
                {linkData.name}
              </a>
            );
          }
        })}
      </div>
    </div>
  );
}
