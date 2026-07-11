import { useEffect, useState } from "react";

/**
 * A custom hook that delays the update of a state value.
 * Useful for search inputs, window resize events, or any high-frequency updates.
 *
 * @template T - The type of the value being debounced.
 * @param {T} value - The current value (usually from state).
 * @param {number} [delay=500] - The delay in milliseconds.
 * @returns {T} - The debounced value which only updates after the delay.
 */
function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set a timer to update the debounced value after the specified delay
    const timeout = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // If the component re-renders (and 'value' or 'delay' changes), 
    // clear the previous timer and start a fresh one.
    return () => {
      window.clearTimeout(timeout);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;