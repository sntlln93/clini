import { useLoaderData } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ApiValidationError } from "@/types/api";
import { useToast } from "@/components/ui/use-toast";
import { updateAppointment } from "@/lib/services/appointment";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { AppointmentType } from "@/types/enums/entities";
import { useRouter } from "@tanstack/react-router";
import {
    AppointmentForm,
    appointmentFormSchema,
} from "@/features/Appointments/form/schema";

export function useEdit() {
    const appointment = useLoaderData({ from: "/_dashboard" });
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<AppointmentForm>({
        resolver: zodResolver(appointmentFormSchema),
        defaultValues: {
            patientId: Number(appointment.patient.id),
            date: appointment.date,
            time: format(appointment.time, "HH:mm:ss"),
            duration: appointment.duration,
            type: appointment.type as AppointmentType,
            phone:
                appointment.phone.length > 0
                    ? appointment.phone.split(" ").join("")
                    : "",
            reason: appointment.reason ?? "",
        },
    });

    const { mutate, isPending, isSuccess } = useMutation({
        onError: ({ response }: ApiValidationError) =>
            toast({
                title: "Error",
                description: response?.data.message,
                variant: "destructive",
            }),
        onSuccess: async (data) => {
            toast({
                title: "Turno modificado",
                description: `De ${format(appointment.date, "dd 'de' LLLL", { locale: es })} a las ${format(appointment.time, "HH:mm", { locale: es })} a ${format(data.date, "dd 'de' LLLL", { locale: es })} a las ${format(data.time, "HH:mm", { locale: es })}`,
                variant: "default",
            });
            await router.invalidate();
            router.navigate({
                search: {
                    day: data.date.getDate(),
                    month: data.date.getMonth() + 1,
                    year: data.date.getFullYear(),
                },
            });
        },
        mutationFn: (payload: AppointmentForm) =>
            updateAppointment(payload, appointment.id),
    });

    const onSubmit = (values: AppointmentForm) => mutate(values);

    return {
        onSubmit,
        isPending,
        isSuccess,
        form,
    };
}
