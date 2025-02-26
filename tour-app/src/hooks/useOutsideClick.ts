import { useEffect, useRef } from "react";

export const useOutsideClick = (handler: () => void) => {
    const ref = useRef<HTMLDivElement>(null); 

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => { 
            if (ref.current && !ref.current.contains(e.target as Node)) {
                handler();
            }
        };

        document.addEventListener('click', handleClickOutside, true);

        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [handler]);

    return { ref };
};