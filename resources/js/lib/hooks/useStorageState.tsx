import {
    SetStateAction,
    Dispatch,
    useCallback,
    useEffect,
    useState,
} from "react";

export function setStorageItem<T>(key: string, value: T | null) {
    try {
        if (value === null) {
            window.localStorage.removeItem(key);
        } else {
            window.localStorage.setItem(key, JSON.stringify(value));
        }
    } catch (e) {
        console.error("Local storage is unavailable:", e);
    }
}

export function useStorageState<T = string>(
    key: string
): [T | null, Dispatch<SetStateAction<T | null>>] {
    // Public
    const [state, setState] = useState<T | null>(null);

    // Get
    useEffect(() => {
        const item = window.localStorage.getItem(key);
        if (item) {
            setState(JSON.parse(item));
        }
    }, [key]);

    // Set
    const setValue: Dispatch<SetStateAction<T | null>> = useCallback(
        (value: SetStateAction<T | null>) => {
            setState(value);
            setStorageItem(key, value);
        },
        [key]
    );

    return [state, setValue];
}
