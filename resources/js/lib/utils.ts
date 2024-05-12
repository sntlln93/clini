import { format } from "date-fns";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { BreakPoint } from "@/types/ui";

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

/**
 * Returns a valid, non-relative date according to the strtotime PHP function.
 */
export function toPhpStrtotimeFormat(date: Date): string {
    if (!(date instanceof Date)) {
        throw new Error("Input must be a Date object");
    }

    return format(date, "yyyy-MM-dd");
}

export function getBreakPoint(): BreakPoint {
    const width = window.innerWidth;

    if (width >= 1536) {
        return "2xl";
    } else if (width >= 1280) {
        return "xl";
    } else if (width >= 1024) {
        return "lg";
    } else if (width >= 768) {
        return "md";
    } else {
        return "sm";
    }
}

export function mergeDateAndTime(date: Date, time: Date) {
    return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        time.getHours(),
        time.getMinutes(),
        time.getSeconds(),
        time.getMilliseconds()
    );
}
