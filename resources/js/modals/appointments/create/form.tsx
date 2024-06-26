import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Home, Hospital } from "lucide-react";
import { SelectPatient } from "@/components/form/select-patient";
import { Textarea } from "@/components/ui/textarea";
import { Patient } from "@/types/entities";
import { OptionalLabel } from "@/components/form/optional-label";
import { UseFormReturn } from "react-hook-form";
import { AppointmentForm } from "./schema";

type FormProps = {
    form: UseFormReturn<AppointmentForm>;
    patient?: Patient;
};

export function AppointmentFields({ form, patient }: FormProps) {
    return (
        <>
            {!patient ? (
                <FormField
                    control={form.control}
                    name="patientId"
                    render={({ field }) => <SelectPatient form={form} />}
                />
            ) : null}

            <div className="flex gap-2">
                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel>Fecha</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full pl-3 text-left font-normal",
                                                !field.value &&
                                                    "text-muted-foreground",
                                            )}
                                        >
                                            {field.value
                                                ? format(field.value, "PPP")
                                                : null}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                >
                                    <Calendar
                                        daysWithEvents={[]}
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) => date < new Date()}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel>Hora</FormLabel>
                            <FormControl>
                                <Input type="time" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <div className="flex gap-2">
                <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel>Duración</FormLabel>
                            <Select onValueChange={field.onChange}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Elija una duración estimada para la consulta" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="15">15 min</SelectItem>
                                    <SelectItem value="30">30 min</SelectItem>
                                    <SelectItem value="45">45 min</SelectItem>
                                    <SelectItem value="60">60 min</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel>Tipo de consulta</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                            >
                                <FormControl className="flex-1">
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Visit">
                                        <div className="inline-flex items-center">
                                            <Hospital className="h-4 w-4 mr-2" />
                                            <span>Consultorio</span>
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="Practice">
                                        <div className="inline-flex items-center">
                                            <Home className="h-4 w-4 mr-2" />
                                            <span>Domicilio</span>
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Teléfono <OptionalLabel />
                        </FormLabel>
                        <FormControl>
                            <Input
                                autoComplete="off"
                                placeholder="351789645"
                                {...field}
                            />
                        </FormControl>
                        <FormDescription>
                            Un número válido consiste de exactamente 10 dígitos
                            numéricos incluyendo el código de área.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Motivo de la consulta <OptionalLabel />
                        </FormLabel>
                        <FormControl>
                            <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
    );
}
