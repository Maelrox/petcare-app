import { useCallback, useRef } from "react";

const useDebounce = (func: Function, delay: number) => {
    const timeoutRef = useRef<NodeJS.Timeout>();
  
    return useCallback((...args: any[]) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        func(...args);
      }, delay);
    }, [func, delay]);
  };

export default useDebounce;