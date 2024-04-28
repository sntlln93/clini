import { cn } from "@/lib/utils";
import { Spinner } from "./Spinner";

export function Loader(props: { className?: string }) {
    return (
        <div
            className={cn(
                "h-full flex items-center justify-center",
                ...(props.className ?? "")
            )}
        >
            <Spinner />
        </div>
    );
}
