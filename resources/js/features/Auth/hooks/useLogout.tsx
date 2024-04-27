import { useMutation } from "@tanstack/react-query";
import { logout } from "../auth.service";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { authAtom } from "@/lib/hooks/useAuth";

export function useLogoutAction() {
    const { toast } = useToast();
    const navigate = useNavigate();

    const [auth, setAuth] = useAtom(authAtom);

    const { mutate: attemptLogout, isPending: logoutIsPending } = useMutation({
        onError: () =>
            toast({
                title: "Error",
                description: "Algo falló, intente nuevamente.",
                variant: "destructive",
            }),
        onSuccess: () => {
            setAuth("");
            toast({
                title: "Adiós",
                variant: "default",
            });
            navigate("/login");
        },

        mutationFn: () => logout({ token: auth }),
    });

    return {
        attemptLogout,
        logoutIsPending,
    };
}
