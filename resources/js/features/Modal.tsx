import { PropsWithChildren, ReactNode } from "react";
import { X } from "lucide-react";
import { usePreventBackgroundScrolling } from "@/lib/hooks/usePreventBackgroundScrolling";

type ModalProps = {
    handleClose: () => void;
    title: string;
    children: ReactNode;
};

function Modal({ handleClose, title, children }: ModalProps) {
    const ref = usePreventBackgroundScrolling<HTMLDivElement>();

    return (
        <div
            ref={ref}
            className="fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        >
            <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
                {/* Header */}
                <div className="flex justify-between p-6  w-full rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                    <div className="text-lg font-bold leading-none tracking-tight space-y-1.5 text-center sm:text-left ">
                        {title}
                    </div>
                    <button onClick={handleClose}>
                        <X className="h-4 w-4" />
                        <span className="sr-only">Cerrar</span>
                    </button>
                </div>

                <div className="px-6">{children}</div>
            </div>
        </div>
    );
}

type ModalActionsProps = PropsWithChildren;

Modal.Actions = ({ children }: ModalActionsProps) => {
    return <div className="my-6 flex justify-between gap-2">{children}</div>;
};

export default Modal;
