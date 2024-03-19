import { useRef, useState } from "react";
import { useOutsideAlerter } from "../Hooks";

interface AddLinkToProjectItemProps {
  close: () => void;
  accept: (name: string, link: string) => void;
}

export default function AddLinkToProjectItem({
  close,
  accept,
}: AddLinkToProjectItemProps) {
  const alertRef = useOutsideAlerter<HTMLDivElement>(close);
  const nameRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  return (
    <div className="add-link-container" ref={alertRef}>
      <div className="add-link-input-container">
        <p className="add-link-input-name">Name</p>
        <input
          className="add-link-input"
          value={name}
          autoFocus
          onKeyDown={(e) => {
            if (e.key == "Enter" && linkRef.current) {
              linkRef.current.focus();
            }
          }}
          ref={nameRef}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="add-link-input-container">
        <p className="add-link-input-name">Link</p>
        <input
          className="add-link-input"
          value={link}
          ref={linkRef}
          onChange={(e) => setLink(e.target.value)}
          onKeyDown={(e) => {
            if (e.key == "Enter" && name && link) {
              accept(name, link);
            }
          }}
        />
      </div>
    </div>
  );
}
