import { useSession } from "@/lib/contexts/auth.context";
import { useQuery } from "@tanstack/react-query";
import { getClosestAppointment } from "../appointment.service";

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
