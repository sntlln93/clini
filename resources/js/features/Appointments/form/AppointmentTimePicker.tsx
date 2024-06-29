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
import { Fragment } from "react";

export function AppointmentTimePicker({ field }: ControlProps<"time">) {
    return (
        <FormItem className="flex-1">
            <FormLabel>Hora</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Elija la hora" />
                    </SelectTrigger>
                </FormControl>
                <SelectContent>
                    {Array.from({ length: 16 }).map((_, index) => (
                        <Fragment key={index}>
                            <SelectItem
                                value={`${(index + 7).toString().padStart(2, "0")}:00:00`}
                            >
                                {`${(index + 7).toString().padStart(2, "0")}:00 hs`}
                            </SelectItem>
                            <SelectItem
                                value={`${(index + 7).toString().padStart(2, "0")}:15:00`}
                            >
                                {`${(index + 7).toString().padStart(2, "0")}:15 hs`}
                            </SelectItem>
                            <SelectItem
                                value={`${(index + 7).toString().padStart(2, "0")}:30:00`}
                            >
                                {`${(index + 7).toString().padStart(2, "0")}:30 hs`}
                            </SelectItem>
                            <SelectItem
                                value={`${(index + 7).toString().padStart(2, "0")}:45:00`}
                            >
                                {`${(index + 7).toString().padStart(2, "0")}:45 hs`}
                            </SelectItem>
                        </Fragment>
                    ))}
                    <SelectItem value="23:00:00">23:00 hs</SelectItem>
                </SelectContent>
            </Select>
            <FormMessage />
        </FormItem>
    );
}
