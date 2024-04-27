import { Spinner } from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type UserCredentials } from "./auth.schema";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useLoginAction, useLoginForm } from "./hooks/useLogin";

export function LoginForm() {
    const { attemptLogin, loginIsPending } = useLoginAction();
    const { form } = useLoginForm();

    function onSubmit(values: UserCredentials) {
        attemptLogin(values);
    }

    return (
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
                                <FormLabel>Nombre de usuario</FormLabel>
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
                                <FormLabel>Contraseña</FormLabel>
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
                        disabled={loginIsPending}
                        className="w-full"
                    >
                        {loginIsPending && (
                            <Spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Iniciar sesión
                    </Button>
                </form>
            </Form>
        </div>
    );
}
