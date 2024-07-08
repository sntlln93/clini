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
import { specialties } from "@/lib/consts/specialties";
import { MultiSelect } from "@/components/ui/multiselect";

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
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="specialties"
                render={({ field }) => (
                    <FormItem className="mb-5">
                        <FormLabel>Especialidad</FormLabel>
                        <MultiSelect
                            selected={field.value}
                            options={specialties.map((specialty) => ({
                                value: specialty,
                                label: specialty,
                            }))}
                            onChange={field.onChange}
                        />
                        <FormDescription>
                            Podés elegir más de una
                        </FormDescription>
                    </FormItem>
                )}
            />
        </div>
    );
}
