import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../features/Auth/auth.service";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useSession } from "../contexts/auth.context";

export function useLogoutAction() {
    const { toast } = useToast();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { session, setSession } = useSession();

    const { mutate: attemptLogout, isPending: logoutIsPending } = useMutation({
        onError: () =>
            toast({
                title: "Error",
                description: "Algo falló, intente nuevamente.",
                variant: "destructive",
            }),
        onSuccess: () => {
            setSession(null);
            queryClient.invalidateQueries({ queryKey: ["auth"] });
            toast({
                title: "👋 Adiós",
                variant: "default",
            });
            navigate("/login");
        },

        mutationFn: () => logout({ token: session! }),
    });

    return {
        attemptLogout,
        logoutIsPending,
    };
}
