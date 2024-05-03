import { useToast } from "@/components/ui/use-toast";
import { type ApiValidationError } from "@/types/api";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type UserCredentials, loginSchema } from "../auth.schema";
import { login } from "../auth.service";
import { usePreservedRedirect } from "@/lib/hooks/usePreservedRedirect";
import { useStorageState } from "@/lib/hooks/useStorageState";

export function useLoginAction() {
    const { toast } = useToast();
    const navigate = useNavigate();
    const redirectPath = usePreservedRedirect();

    const [, setAuth] = useStorageState("token");
    const { mutate: attemptLogin, isPending: loginIsPending } = useMutation({
        onError: ({ response }: ApiValidationError) =>
            toast({
                title: "Error",
                description: response?.data.message,
                variant: "destructive",
            }),
        onSuccess: (data) => {
            setAuth(data.token);
            navigate(redirectPath);
        },
        mutationFn: login,
    });

    return {
        attemptLogin,
        loginIsPending,
    };
}

export function useLoginForm() {
    const form = useForm<UserCredentials>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    return { form };
}
