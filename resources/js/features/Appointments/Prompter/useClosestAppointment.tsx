import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/lib/hooks/useAuth";
import { getClosestAppointment } from "@/lib/services/appointment";

export function useClosestAppointment() {
    const { user } = useAuth();

    const { data: appointment, isPending } = useQuery({
        queryKey: ["appointments", "closest"],
        queryFn: () => getClosestAppointment(user!.token),
        enabled: !!user,
    });

    return {
        appointment,
        isPending,
    };
}
