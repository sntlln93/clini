import { useSession } from "@/lib/contexts/auth.context";
import { getClosestAppointment } from "../Appointments/appointment.service";
import { useQuery } from "@tanstack/react-query";

export function useClosestAppointment() {
    const { session } = useSession();

    const { data: appointment, isPending } = useQuery({
        queryKey: ["appointments", "closest"],
        queryFn: () => getClosestAppointment(session!),
        enabled: !!session,
    });

    return {
        appointment,
        isPending,
    };
}
