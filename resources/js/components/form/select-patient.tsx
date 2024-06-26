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
import { UseFormReturn } from "react-hook-form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { AppointmentForm } from "@/modals/appointments/create/schema";
import { searchPatient } from "@/lib/services/patient";

interface SelectPatientProps {
    form: UseFormReturn<AppointmentForm>;
}

export function SelectPatient({ form }: SelectPatientProps) {
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);

    const { data: patients } = useQuery({
        queryKey: ["patients", search],
        queryFn: ({ queryKey: [, filter] }) => searchPatient(filter),
        // enabled: search.length > 0
    });

    const name = (value: number) => {
        const patient = patients?.find(
            (patient) => Number(patient.id) === value,
        );

        if (!patient) return null;

        return `${patient.fullName} - ${patient.dni}`;
    };

    const fieldValue = form.getValues("patientId");

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
                                fieldValue && "text-muted-foreground",
                            )}
                        >
                            <span>
                                {fieldValue
                                    ? name(fieldValue)
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
                                                Number(patient.id),
                                            );
                                            setOpen(false);
                                        }}
                                    >
                                        {patient.fullName} - {patient.dni}
                                        <CheckIcon
                                            className={cn(
                                                "ml-auto h-4 w-4",
                                                Number(patient.id) ===
                                                    fieldValue
                                                    ? "opacity-100"
                                                    : "opacity-0",
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
