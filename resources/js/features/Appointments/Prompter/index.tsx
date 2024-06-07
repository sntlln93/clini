import { CircleCheck, Clock } from "lucide-react";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { formatDistance } from "date-fns";
import { es } from "date-fns/locale";
import { useClosestAppointment } from "./useClosestAppointment";
import { Spinner } from "@/components/Spinner";
import { useSetAtom } from "jotai";
import { appointmentAtom } from "@/stores/ui";

export function Prompter() {
    const [prefersReduceMotion, setPrefersReduceMotion] = useState(true);
    const { appointment, isPending } = useClosestAppointment();
    const setAppointment = useSetAtom(appointmentAtom);

    useEffect(() => {
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setPrefersReduceMotion(false);
        }
    }, []);

    if (isPending) {
        return (
            <div className="p-2 bg-accent max-w-[400px] text-primary text-sm border rounded-xl flex overflow-hidden">
                <span>Revisando tus próximos turnos</span>
                <Spinner className="ml-2 w-5 h-5 inline-block" />
            </div>
        );
    }

    if (!appointment?.date) {
        return (
            <div className="p-2 bg-accent max-w-[400px] text-primary text-sm border rounded-xl flex overflow-hidden">
                <span>No hay turnos el resto del día</span>
                <CircleCheck className="ml-2 w-5 h-5 inline-block" />
            </div>
        );
    }

    const time = formatDistance(appointment!.time, new Date(), {
        addSuffix: true,
        locale: es,
    });

    return (
        <button
            className={`px-2 max-w-[400px] bg-amber-500 text-primary-foreground text-sm border rounded-xl flex overflow-hidden`}
            onClick={() => setAppointment(appointment)}
        >
            <div
                className={styles.scroller}
                data-animated={true}
                data-direction="left"
                data-duration="fast"
            >
                <ul className={styles.scroller__inner}>
                    <li>
                        <span>
                            {appointment!.patient.fullName} - {time}
                        </span>
                        <Clock className="ml-2 w-5 h-5 inline-block" />
                    </li>

                    {!prefersReduceMotion ? (
                        <li aria-hidden={true}>
                            <span>
                                {appointment!.patient.fullName} - {time}
                            </span>
                            <Clock className="ml-2 w-5 h-5 inline-block" />
                        </li>
                    ) : null}
                </ul>
            </div>
        </button>
    );
}
