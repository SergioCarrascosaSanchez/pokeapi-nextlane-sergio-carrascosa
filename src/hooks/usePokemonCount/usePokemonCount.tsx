import { useState } from "react";

export function usePokemonCount() {
  const [count, setCount] = useState<Record<string, number>>({});

  function incrementCount(name: string) {
    setCount((prevCount) => {
      const current = prevCount[name] ?? 0;
      return {
        ...prevCount,
        [name]: current + 1,
      };
    });
  }

  function getCount(name: string) {
    return count[name] ?? 0;
  }

  return { getCount, incrementCount };
}
