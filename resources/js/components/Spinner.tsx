import { cn } from "@/lib/utils";
import React from "react";

interface SpinnerProps extends React.SVGAttributes<SVGElement> {
    size?: number;
}

export function Spinner({ className, size = 24 }: SpinnerProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("animate-spin", className)}
        >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
    );
}
