export function setStorageItem(key: string, value: unknown) {
    try {
        if (value === null) {
            window.localStorage.removeItem(key);
        } else {
            window.localStorage.setItem(
                key,
                typeof value === "string" ? value : JSON.stringify(value),
            );
        }
    } catch (e) {
        console.error("Local storage is unavailable:", e);
    }
}

export function getStorageItem<T = unknown>(key: string): T {
    const item = window.localStorage.getItem(key);
    let value: T;

    try {
        if (!item) throw new Error();
        value = JSON.parse(item) as T;
    } catch (e) {
        value = item as T;
    }

    return value;
}
