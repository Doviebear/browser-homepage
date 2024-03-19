import { useState, useEffect, useRef } from "react";

export function useLocalStorage<V>(
  storageKey: string,
  fallbackState: V
): [V, React.Dispatch<React.SetStateAction<V>>, () => void] {
  const [value, setValue] = useState<V>(
    JSON.parse(localStorage.getItem(storageKey) ?? "null") ?? fallbackState
  );

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [value, storageKey]);

  const deleteFunc = () => {
    localStorage.removeItem(storageKey);
  };

  return [value, setValue, deleteFunc];
}

export function useOutsideAlerter<T extends Node>(callback: () => void) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      if (
        event.target instanceof Element &&
        ref.current &&
        !ref.current.contains(event.target)
      ) {
        callback();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
  return ref;
}
