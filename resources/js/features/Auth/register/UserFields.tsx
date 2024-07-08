import { Input } from "@/components/ui/input";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { RegisterPracticeSchema } from "@/lib/schemas/register-practice.schema";
import { useFormContext } from "react-hook-form";

export function UserFields() {
    const form = useFormContext<RegisterPracticeSchema>();

    return (
        <div className="flex flex-col gap-4">
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Correo electrónico</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Tu correo electrónico"
                                type="email"
                                {...field}
                                autoComplete="off"
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

            <FormField
                control={form.control}
                name="names"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nombres</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Édgar Ricardo"
                                {...field}
                                autoComplete="off"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Apellido</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Arjona Morales"
                                {...field}
                                autoComplete="off"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}
