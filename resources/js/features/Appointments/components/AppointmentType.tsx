import { Badge } from "@/components/ui/badge";
import { AppointmentType as Type } from "@/types/enums/entities";
import { Home, Hospital } from "lucide-react";

export function AppointmentType({
    appointmentType,
}: {
    appointmentType: string;
}) {
    if (!Object.values(Type).find((t) => t === appointmentType)) {
        throw new Error(
            "Argument appointmentType is not a member of AppointmentType"
        );
    }

    if (appointmentType === Type.Visit) {
        return (
            <Badge className="bg-primary/70 py-1">
                <span className="">Domicilio</span>
                <Home className="h-5 w-5 ml-2" />
            </Badge>
        );
    }
    return (
        <Badge className="bg-primary/70 py-1">
            <span className="">Consultorio</span>
            <Hospital className="h-5 w-5 ml-2" />
        </Badge>
    );
}
