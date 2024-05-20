import * as React from "react";

import { cn } from "@/lib/utils";
import { Eye, EyeOff, Lock, LucideIcon, LucideProps } from "lucide-react";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    startIcon?: LucideIcon;
    endIcon?: LucideIcon;
    iconProps?: LucideProps;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        { className, type, startIcon, endIcon, iconProps = {}, ...props },
        ref
    ) => {
        const [show, setShow] = React.useState(false);
        const StartIcon = startIcon;
        const EndIcon = endIcon;
        const { className: iconClassName, ...iconRest } = iconProps;

        if (type === "password") {
            return (
                <div className="w-full relative">
                    <div className="absolute left-1.5 top-1/2 transform -translate-y-1/2">
                        <Lock
                            size={18}
                            className={cn("opacity-40", iconClassName)}
                            {...iconRest}
                        />
                    </div>
                    <input
                        autoComplete="off"
                        type={!show ? type : "text"}
                        className={cn(
                            "flex h-10 w-full rounded-md border border-input bg-background py-2 px-8 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
                            className
                        )}
                        ref={ref}
                        {...props}
                    />
                    <button
                        onClick={() => setShow((prev) => !prev)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        type="button"
                    >
                        {show ? (
                            <Eye className="opacity-40" size={18} />
                        ) : (
                            <EyeOff className="opacity-40" size={18} />
                        )}
                    </button>
                </div>
            );
        }

        return (
            <div className="w-full relative">
                {StartIcon && (
                    <div className="absolute left-1.5 top-1/2 transform -translate-y-1/2">
                        <StartIcon
                            size={18}
                            className={cn("opacity-40", iconClassName)}
                            {...iconRest}
                        />
                    </div>
                )}
                <input
                    type={type}
                    className={cn(
                        "flex h-10 w-full rounded-md border border-input bg-background py-2 px-4 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
                        startIcon ? "pl-8" : "",
                        endIcon ? "pr-8" : "",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {EndIcon && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <EndIcon
                            className={cn("opacity-40", iconClassName)}
                            {...iconRest}
                            size={18}
                        />
                    </div>
                )}
            </div>
        );
    }
);
Input.displayName = "Input";

export { Input };
