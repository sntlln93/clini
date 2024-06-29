import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function EmptySelection() {
    const classes = {
        booked: "h-5 w-5 p-0 border bg-blue-100 text-primary hover:bg-blue-400 hover:text-primary-foreground focus:bg-blue-400 focus:text-primary-foreground",
        selected:
            "h-5 w-5 p-0 border bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        empty: cn(
            buttonVariants({ variant: "ghost" }),
            "h-5 w-5 border p-0 font-normal aria-selected:opacity-100 hover:bg-blue-100",
        ),
    };

    return (
        <div className="min-h-[100px] p-10 rounded-lg border transition-all hover:bg-accent">
            Elegí un día para mostrar
            <ul className="flex flex-row gap-4 mt-5">
                <li className="flex flex-row justify-center gap-2">
                    <div className={`w-4 h-4 ${classes.selected}`} />
                    <span>Seleccionado</span>
                </li>
                <li className="flex flex-row justify-center gap-2">
                    <div className={`w-4 h-4 ${classes.booked}`} />
                    <span>Con turnos</span>
                </li>
                <li className="flex flex-row justify-center gap-2">
                    <div className={`w-4 h-4 ${classes.empty}`} />
                    <span>Sin turnos</span>
                </li>
            </ul>
        </div>
    );
}

export function SelectionWithNoAppointments() {
    return (
        <div className="min-h-[50px] grid place-content-center rounded-lg border transition-all hover:bg-accent">
            No hay turnos para mostrar
        </div>
    );
}
