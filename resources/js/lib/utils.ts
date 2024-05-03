import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const queryToString = (queryString: Record<string, number | string>) => {
    return Object.entries(queryString)
        .filter(([, value]) => value !== null && value !== "null")
        .filter(([, value]) => value !== 0 && value !== "0")
        .filter(([, value]) => String(value).length !== 0)
        .reduce((prev, [key, value]) => {
            const acc = `${prev.length > 0 ? prev + "&" : prev}${key}=${value}`;
            return acc;
        }, "");
};

export function toTitleCase(str: string) {
    return str
        .split(" ")
        .map(function (word) {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join(" ");
}
