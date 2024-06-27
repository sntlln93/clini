import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Modal from "@/features/Modal";
import { Spinner } from "@/components/Spinner";
import { useEffect } from "react";
import { usePreserveSearchNavigation } from "@/lib/hooks/usePreserveSearchNavigation";
import { AppointmentFields } from "./form";
import { useForm } from "react-hook-form";
import { AppointmentForm, appointmentFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ApiValidationError } from "@/types/api";
import { useToast } from "@/components/ui/use-toast";
import { createAppointment } from "@/lib/services/appointment";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { AppointmentType } from "@/types/enums/entities";
import { useRouter } from "@tanstack/react-router";

export default function CreateAppointmentModal() {
    const navigate = usePreserveSearchNavigation();
    const router = useRouter();

    const { toast } = useToast();

    const defaultTime = () => {
        const currentHour = new Date().getHours();

        if (currentHour < 7 || currentHour > 23) return "07:00:00";

        return (currentHour + 1).toString().padStart(2, "0") + ":00:00";
    };

    const form = useForm<AppointmentForm>({
        resolver: zodResolver(appointmentFormSchema),
        defaultValues: {
            phone: "",
            duration: 60,
            type: AppointmentType.Practice,
            time: defaultTime(),
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
                title: "Turno agregado",
                description: `${format(data.date, "dd 'de' LLLL", { locale: es })} a las ${format(data.time, "HH:mm", { locale: es })}`,
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
        mutationFn: (payload: AppointmentForm) => createAppointment(payload),
    });

    useEffect(() => {
        if (isSuccess) {
            closeSelf();
        }
    }, [isSuccess]);

    const closeSelf = () => {
        navigate({ modal: undefined });
    };

    const onSubmit = (values: AppointmentForm) => mutate(values);

    return (
        <Modal open={true} handleClose={closeSelf} title="Nuevo Turno">
            <Form {...form}>
                <form
                    className="grid gap-5"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <AppointmentFields form={form} />

                    <Modal.Actions>
                        <Button disabled={isPending} type="submit">
                            {isPending ? (
                                <>
                                    Guardando
                                    <Spinner className="ml-2 h-4 w-4 animate-spin" />
                                </>
                            ) : (
                                "Guardar"
                            )}
                        </Button>
                    </Modal.Actions>
                </form>
            </Form>
        </Modal>
    );
}
