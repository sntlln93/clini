import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { useEffect, useRef } from "react";

/**
 * Pass this ref to the modal's parent component
 */
export function usePreventBackgroundScrolling<T extends HTMLElement>() {
    const ref = useRef<T>(null);

    useEffect(() => {
        if (ref.current) {
            const observerRefValue = ref.current;
            disableBodyScroll(observerRefValue);

            return () => {
                if (observerRefValue) {
                    enableBodyScroll(observerRefValue);
                }
            };
        }
    }, [ref.current]);

    return ref;
}
