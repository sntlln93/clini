import { cn } from "@/lib/utils";

export function InlineLogo() {
    return (
        <div className="absolute z-20 bottom-10 left-10 flex items-center text-lg font-medium">
            <SVGLogo className="mr-2" />
            Clini. Gestión de Pacientes.
        </div>
    );
}

export function SVGLogo(props: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("h-6 w-6", props.className)}
        >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
        </svg>
    );
}
