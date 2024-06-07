import { ReactNode } from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

type ModalProps = {
    open: boolean;
    handleClose: () => void;
    title?: string;
    description?: string;
    children: ReactNode;
};

function Modal({
    open,
    handleClose,
    title,
    description,
    children,
}: ModalProps) {
    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && (
                        <DialogDescription>{description}</DialogDescription>
                    )}
                </DialogHeader>
                <div className="grid gap-4">{children}</div>
            </DialogContent>
        </Dialog>
    );
}

Modal.Actions = DialogFooter;

export default Modal;
