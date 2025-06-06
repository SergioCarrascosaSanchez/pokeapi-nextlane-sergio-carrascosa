import { useState, useEffect } from "react";

const STORAGE_KEY = "pokemon-count";

export function usePokemonCount() {
  const [count, setCount] = useState<Record<string, number>>({});

  useEffect(() => {
    const storedCount = localStorage.getItem(STORAGE_KEY);
    if (storedCount) {
      const parsedCount = JSON.parse(storedCount);
      setCount(parsedCount);
    }
  }, []);

  function incrementCount(name: string) {
    setCount((prevCount) => {
      const current = prevCount[name] ?? 0;
      const newCount = {
        ...prevCount,
        [name]: current + 1,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newCount));
      return newCount;
    });
  }

  function getCount(name: string) {
    return count[name] ?? 0;
  }

  return { getCount, incrementCount };
}
