import { useEffect, useRef } from "react";

// antes era usado React-land, esse nao tem memory leaks (verificar) TODO
export default function useInterval(callback, delay) {
  const saved = useRef();
  useEffect(() => {
    saved.current = callback;
  }, [callback]);
  useEffect(() => {
    if (delay == null) return;
    const id = setInterval(() => saved.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}
