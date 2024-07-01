import {
    CalendarCheck,
    CircleCheck,
    CalendarX2,
    Edit,
    Clock,
    User2,
    Calendar,
    Phone,
    Clipboard,
    Ellipsis,
    Edit2,
} from "lucide-react";

import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/ui/menubar";
import { WhatsappIcon } from "@/components/icons/WhatsappIcon";
import { Link, useRouter } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Spinner } from "@/components/Spinner";
import { useToast } from "@/components/ui/use-toast";
import { Appointment } from "@/types/entities";
import { updateAppointment } from "@/lib/services/appointment";
import { AppointmentStatus } from "@/types/enums/entities";

type AppointmentMenuProps = { appointment: Appointment; className?: string };

export function AppointmentMenu({
    appointment,
    className = "",
}: AppointmentMenuProps) {
    const phoneNumber = "+549" + appointment.phone.split(" ").join("");
    const { toast } = useToast();

    const router = useRouter();
    const queryClient = useQueryClient();

    const { mutate: copy, isPending: isCopying } = useMutation({
        mutationFn: async () =>
            await navigator.clipboard.writeText(phoneNumber),
        onSuccess: () => {
            toast({
                title: `+54 9 ${appointment.phone} copiado con éxito`,
                description: `El número de ${appointment.patient.fullName} se ha copiado al portapapeles`,
                variant: "success",
            });
        },
        onError: () => {
            toast({
                title: `Algo salió mal`,
                description: `No se pudo copiar el número de ${appointment.patient.fullName}`,
                variant: "destructive",
            });
        },
    });

    const { mutate: updateStatus, isPending: isUpdating } = useMutation({
        mutationFn: (status: AppointmentStatus) =>
            updateAppointment({ status }, appointment.id),
        onSuccess: (data) => {
            toast({
                title: `Actualizó el estado del turno a ${data.status} correctamente`,
                description: `El número de ${appointment.patient.fullName} se ha copiado al portapapeles`,
                variant: "success",
            });
            queryClient.refetchQueries({
                queryKey: ["appointments", "jul"],
            });
            router.invalidate();
        },
        onError: () => {
            toast({
                title: `Algo salió mal`,
                description: `No se pudo actualizar el estado de este turno`,
                variant: "destructive",
            });
        },
    });

    const onCopy = () => copy();
    const onStatusUpdate = (status: AppointmentStatus) => () =>
        updateStatus(status);

    return (
        <Menubar className={className}>
            <MenubarMenu>
                <MenubarTrigger>
                    <Ellipsis className="h-4 w-4" />
                </MenubarTrigger>
                <MenubarContent className="mx-2">
                    <MenubarItem>
                        <User2 className="h-4 w-4 mr-2" /> Ver paciente
                    </MenubarItem>
                    <MenubarItem asChild>
                        <Link
                            search={{
                                modal: "appointment.show",
                                appointmentId: appointment.id,
                            }}
                        >
                            <Calendar className="h-4 w-4 mr-2" /> Ver turno
                        </Link>
                    </MenubarItem>

                    <MenubarItem asChild>
                        <Link
                            search={{
                                modal: "appointment.edit",
                                appointmentId: appointment.id,
                            }}
                        >
                            <Edit className="h-4 w-4 mr-2" /> Modificar turno
                        </Link>
                    </MenubarItem>

                    <MenubarSeparator />

                    <MenubarItem asChild>
                        <Link target="_blank" to={`tel:${phoneNumber}`}>
                            <Phone className="h-4 w-4 mr-2" /> Llamar
                        </Link>
                    </MenubarItem>
                    <MenubarItem asChild>
                        <Link
                            target="_blank"
                            to={`https://wa.me/${phoneNumber}`}
                        >
                            <WhatsappIcon className="h-4 w-4 mr-2" /> Enviar
                            mensaje
                        </Link>
                    </MenubarItem>
                    <MenubarItem onClick={onCopy} disabled={isCopying}>
                        {isCopying ? (
                            <>
                                <Spinner className="h-4 w-4 mr-2" /> Copiando
                                número de teléfono
                            </>
                        ) : (
                            <>
                                <Clipboard className="h-4 w-4 mr-2" /> Copiar
                                número de teléfono
                            </>
                        )}
                    </MenubarItem>

                    <MenubarSeparator />
                    <MenubarSub>
                        <MenubarSubTrigger disabled={isUpdating}>
                            {isUpdating ? (
                                <>
                                    <Spinner className="h-4 w-4 mr-2" />{" "}
                                    Actualizando estado
                                </>
                            ) : (
                                <>
                                    <Edit2 className="h-4 w-4 mr-2" /> Marcar
                                    como
                                </>
                            )}
                        </MenubarSubTrigger>
                        <MenubarSubContent>
                            <MenubarItem
                                onClick={onStatusUpdate(AppointmentStatus.Done)}
                            >
                                <CalendarCheck className="h-4 w-4 mr-2" />{" "}
                                Asistió
                            </MenubarItem>
                            <MenubarItem
                                onClick={onStatusUpdate(
                                    AppointmentStatus.Canceled,
                                )}
                            >
                                <CircleCheck className="h-4 w-4 mr-2" />{" "}
                                Cancelado
                            </MenubarItem>
                            <MenubarItem
                                onClick={onStatusUpdate(
                                    AppointmentStatus.Missed,
                                )}
                            >
                                <CalendarX2 className="h-4 w-4 mr-2" /> No
                                asistió
                            </MenubarItem>
                            <MenubarItem
                                onClick={onStatusUpdate(
                                    AppointmentStatus.Pending,
                                )}
                            >
                                <Clock className="h-4 w-4 mr-2" /> Pendiente
                            </MenubarItem>
                        </MenubarSubContent>
                    </MenubarSub>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    );
}
