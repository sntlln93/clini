import { InlineLogo } from "@/components/Logo";
import { PropsWithChildren } from "react";

export function ErrorLayout({ children }: PropsWithChildren) {
    return (
        <div className="h-screen flex flex-col gap-10 justify-center items-center">
            <InlineLogo />
            {children}
        </div>
    );
}
