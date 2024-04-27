import { useToast } from "@/components/ui/use-toast";
import { ApiValidationError } from "@/types/api";
import { authAtom } from "@/lib/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type UserCredentials, loginSchema } from "../auth.schema";
import { login } from "../auth.service";

export function useLoginAction() {
    const { toast } = useToast();
    const navigate = useNavigate();

    const setAuth = useSetAtom(authAtom);
    const { mutate: attemptLogin, isPending: loginIsPending } = useMutation({
        onError: ({ response }: ApiValidationError) =>
            toast({
                title: "Error",
                description: response?.data.message,
                variant: "destructive",
            }),
        onSuccess: (data) => {
            setAuth(data.token);
            navigate("/");
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
