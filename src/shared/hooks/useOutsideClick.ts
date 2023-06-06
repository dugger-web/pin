import { useEffect, RefObject } from 'react';

type Event = MouseEvent | TouchEvent;

export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: () => void,
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      const withinBoundaries = event.composedPath().includes(ref.current as T)
      if (!withinBoundaries) handler();
    };

    document.addEventListener('click', listener);

    return () => {
      document.removeEventListener('click', listener);
    };
  }, [ref, handler]);
};