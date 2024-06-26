import { useQuery } from "@tanstack/react-query";
import { getClosestAppointment } from "@/lib/services/appointment";

export function useClosestAppointment() {
    const { data: appointment, isPending } = useQuery({
        queryKey: ["appointments", "closest"],
        queryFn: getClosestAppointment,
    });

    return {
        appointment,
        isPending,
    };
}
