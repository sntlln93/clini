import { Input } from "@/components/ui/input";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { RegisterPracticeSchema } from "@/lib/schemas/register-practice.schema";
import { useFormContext } from "react-hook-form";
import { Settings } from "lucide-react";

export function PracticeFields() {
    const form = useFormContext<RegisterPracticeSchema>();

    return (
        <div className="flex flex-col gap-4">
            <FormField
                control={form.control}
                name="practiceName"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nombre de tu consultorio</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="El nombre de tu consultorio"
                                {...field}
                                autoComplete="off"
                            />
                        </FormControl>
                        <FormMessage />
                        <FormDescription className="flex items-center">
                            <span>
                                Puedes modificar esto desde la configuración de
                                la cuenta
                            </span>
                            <Settings className="h-4 w-4 inline ml-1" />
                        </FormDescription>
                    </FormItem>
                )}
            />
        </div>
    );
}
