import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RegisterPracticeSchema } from "@/lib/schemas/register-practice.schema";
import { useFormContext } from "react-hook-form";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CircleCheck, CircleHelp } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

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
                            <Tooltip>
                                <TooltipTrigger>
                                    <CircleHelp className=" ml-2 h-4 w-4 stroke-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Add to library</p>
                                </TooltipContent>
                            </Tooltip>
                        </FormLabel>
                        <ToggleGroup
                            id="toggleRole"
                            type="multiple"
                            className="flex-col"
                            onValueChange={field.onChange}
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
                    </FormItem>
                )}
            />
        </>
    );
}
