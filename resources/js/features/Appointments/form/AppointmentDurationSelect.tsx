import {
    FormControl,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { ControlProps } from "./types";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function AppointmentDurationSelect({ field }: ControlProps<"duration">) {
    return (
        <FormItem className="flex-1">
            <FormLabel>Duración</FormLabel>
            <Select
                onValueChange={field.onChange}
                defaultValue={field.value.toString()}
            >
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
                    <SelectItem value="90">1 h 30 min</SelectItem>
                    <SelectItem value="120">2 h</SelectItem>
                </SelectContent>
            </Select>
            <FormMessage />
        </FormItem>
    );
}
