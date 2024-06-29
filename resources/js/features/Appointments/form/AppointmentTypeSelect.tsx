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
import { Home, Hospital } from "lucide-react";

export function AppointmentTypeSelect({ field }: ControlProps<"type">) {
    return (
        <FormItem className="flex-1">
            <FormLabel>Tipo de consulta</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
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
    );
}
