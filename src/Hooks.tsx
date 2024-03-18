import { useState, useEffect } from "react";

export function useLocalStorage<V>(storageKey: string, fallbackState: V) {
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem(storageKey) ?? "null") ?? fallbackState
  );

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [value, storageKey]);

  return [value, setValue];
}
