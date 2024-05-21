import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
    FormControl,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Patient } from "@/types/entities";
import { useState } from "react";

interface SelectPatientProps {
    field: ControllerRenderProps<FieldValues, "patientId">;
    form: any;
}

const API_URL = "api";

const searchPatient = async (search: string) => {
    const response = await axios.get<Patient[]>(
        `${API_URL}/patients/search?filter=${search}`
    );

    return response.data;
};

export function SelectPatient({ field, form }: SelectPatientProps) {
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);

    const { data: patients } = useQuery({
        queryKey: ["patients", search],
        queryFn: ({ queryKey: [, filter] }) => searchPatient(filter),
        // enabled: search.length > 0
    });

    const name = (value: string) => {
        const patient = patients?.find((patient) => patient.id === value);

        if (!patient) return null;

        return `${patient.fullName} - ${patient.dni}`;
    };

    return (
        <FormItem className="flex flex-col">
            <FormLabel>Paciente</FormLabel>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <FormControl>
                        <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground"
                            )}
                        >
                            <span>
                                {field.value
                                    ? name(field.value)
                                    : "Seleccione un paciente"}
                            </span>
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-min-[200px] p-0">
                    <Command shouldFilter={false}>
                        <CommandList>
                            <CommandInput
                                value={search}
                                onValueChange={setSearch}
                                placeholder="Busque por DNI o nombre"
                                className="h-9"
                            />
                            <CommandEmpty>
                                No se encontraron pacientes.
                            </CommandEmpty>
                            <CommandGroup>
                                {(patients ? patients : []).map((patient) => (
                                    <CommandItem
                                        value={patient.id}
                                        key={patient.id}
                                        onSelect={() => {
                                            form.setValue(
                                                "patientId",
                                                patient.id
                                            );
                                            setOpen(false);
                                        }}
                                    >
                                        {patient.fullName} - {patient.dni}
                                        <CheckIcon
                                            className={cn(
                                                "ml-auto h-4 w-4",
                                                patient.id === field.value
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            <FormMessage />
        </FormItem>
    );
}
