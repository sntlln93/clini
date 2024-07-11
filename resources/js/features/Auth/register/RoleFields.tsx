import {
    FormField,
    FormItem,
    FormDescription,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { RegisterPracticeSchema } from "@/lib/schemas/register-practice.schema";
import { useFormContext } from "react-hook-form";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CircleCheck } from "lucide-react";
import { specialties } from "@/lib/consts/specialties";
import { MultiSelect } from "@/components/ui/multiselect";

export function RoleFields() {
    const form = useFormContext<RegisterPracticeSchema>();

    return (
        <>
            <FormField
                control={form.control}
                name="roles"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="toggleRole">
                            Indica cuál es tu actividad en el consultorio
                        </FormLabel>
                        <ToggleGroup
                            role="select"
                            id="toggleRole"
                            type="multiple"
                            className="flex-col"
                            onValueChange={(value) => {
                                if (!value.includes("doctor")) {
                                    form.resetField("specialties");
                                }

                                field.onChange(value);
                            }}
                            defaultValue={field.value}
                        >
                            <ToggleGroupItem
                                value="doctor"
                                aria-label="Alternar selección profesional de la salud"
                                className="w-full justify-between px-6 py-6"
                            >
                                Atiendo pacientes
                                <CircleCheck
                                    className={`h-5 w-5 stroke-lime-600 opacity-${field.value.includes("doctor") ? "100" : 0}`}
                                />
                            </ToggleGroupItem>
                            <ToggleGroupItem
                                value="secretary"
                                aria-label="Alternar selección administrativo"
                                className="w-full justify-between px-6 py-6"
                            >
                                Realizo tareas administrativas
                                <CircleCheck
                                    className={`h-5 w-5 stroke-lime-600 opacity-${field.value.includes("secretary") ? "100" : 0}`}
                                />
                            </ToggleGroupItem>
                        </ToggleGroup>
                        <FormMessage />
                        <FormDescription>
                            Si elijes la opción{" "}
                            <code className="bg-slate-200 text-primary p-1 rounded">
                                Atiendo pacientes
                            </code>{" "}
                            se te pedirá también, indicar tu especialidad
                        </FormDescription>
                    </FormItem>
                )}
            />

            {form.getValues("roles").includes("doctor") ? (
                <FormField
                    control={form.control}
                    name="specialties"
                    render={({ field }) => (
                        <FormItem className="mb-5">
                            <FormLabel>Especialidad</FormLabel>
                            <MultiSelect
                                selected={field.value ?? []}
                                options={specialties.map((specialty) => ({
                                    value: specialty,
                                    label: specialty,
                                }))}
                                onChange={field.onChange}
                            />
                            <FormMessage />
                            <FormDescription>
                                Puedes elegir más de una
                            </FormDescription>
                        </FormItem>
                    )}
                />
            ) : null}
        </>
    );
}
