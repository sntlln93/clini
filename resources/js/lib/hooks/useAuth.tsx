import { AuthenticatedUser } from "@/types/auth";
import { useToast } from "@/components/ui/use-toast";
import { ApiValidationError } from "@/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { attemptSignIn, attemptSignOut } from "@/lib/services/auth";
import { getStorageItem, setStorageItem } from "@/lib/services/storage";

export function useAuth() {
    const user = getStorageItem<AuthenticatedUser>("auth");

    const { toast } = useToast();
    const redirectBack = new window.URLSearchParams(window.location.search).get(
        "redirect",
    );
    const queryClient = useQueryClient();

    const { mutate: signIn, isPending: signInIsPending } = useMutation({
        onError: ({ response }: ApiValidationError) =>
            toast({
                title: "Error",
                description: response?.data.message,
                variant: "destructive",
            }),
        onSuccess: (data) => {
            setStorageItem("auth", data);
            window.location.replace(redirectBack || "/");
        },
        mutationFn: attemptSignIn,
    });

    const { mutate: signOut, isPending: signOutIsPending } = useMutation({
        onError: () => {
            toast({
                title: "Error",
                description: "Algo falló, intente nuevamente.",
                variant: "destructive",
            });
        },
        onSuccess: () => {
            setStorageItem("auth", null);

            queryClient.invalidateQueries({ queryKey: ["auth"] });
            toast({
                title: "👋 Adiós",
                variant: "default",
            });
            window.location.replace("/login");
        },

        mutationFn: () => attemptSignOut({ token: user!.token }),
    });

    const isAuthenticated = () => {
        return !!user;
    };

    return {
        isAuthenticated,
        signInIsPending,
        signIn,
        signOutIsPending,
        signOut,
        user,
    };
}
