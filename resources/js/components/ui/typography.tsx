import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { ReactNode } from "react";

const headingVariants = cva("scroll-m-20 tracking-tight", {
    variants: {
        variant: {
            h1: "text-4xl font-extrabold lg:text-5xl",
            h2: "border-b pb-2 text-3xl font-semibold first:mt-0",
            h3: "text-2xl font-semibold",
            h4: "text-xl font-semibold",
        },
    },
    defaultVariants: {
        variant: "h1",
    },
});

export function Heading({
    className,
    children,
    variant,
}: {
    className?: string;
    children: ReactNode;
    variant: "h1" | "h2" | "h3" | "h4";
}) {
    const HeadingElement = variant;

    return (
        <HeadingElement className={cn(headingVariants({ variant, className }))}>
            {children}
        </HeadingElement>
    );
}
