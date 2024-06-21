import { createFileRoute } from "@tanstack/react-router";
import { InlineLogo, SVGLogo } from "@/components/Logo";
import { Link } from "@tanstack/react-router";
import { Spinner } from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginSchema, type UserCredentials } from "@/lib/schemas/auth.schema";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/lib/hooks/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const Route = createFileRoute("/_public/login")({
    component: LoginPage,
});

export function LoginPage() {
    const form = useForm<UserCredentials>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });
    const { signIn, signInIsPending } = useAuth();

    function onSubmit(values: UserCredentials) {
        signIn(values);
    }
    return (
        <>
            <InlineLogo />
            <div className="container relative h-[800px] justify-center">
                <div className="items-center flex h-full lg:p-8">
                    <div className="bg-white mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <SVGLogo
                            className={"w-[120px] h-[120px] mx-auto mb-5"}
                        />

                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Ingresa a tu cuenta
                            </h1>
                        </div>

                        <div className="grid gap-6">
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="space-y-8"
                                >
                                    <FormField
                                        control={form.control}
                                        name="username"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Nombre de usuario
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Tu nombre de usuario"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Contraseña
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Tu contraseña"
                                                        type="password"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        type="submit"
                                        disabled={signInIsPending}
                                        className="w-full"
                                    >
                                        {signInIsPending && (
                                            <Spinner className="mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        Iniciar sesión
                                    </Button>
                                </form>
                            </Form>
                        </div>

                        <p className="text-right text-sm text-muted-foreground">
                            <Link
                                href="/forgot-password"
                                className="font-bold hover:text-primary"
                            >
                                ¿Olvidaste tu contraseña?
                            </Link>{" "}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
