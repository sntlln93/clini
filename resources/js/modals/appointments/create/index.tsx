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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiValidationError } from "@/types/api";
import { useToast } from "@/components/ui/use-toast";
import { createAppointment } from "@/lib/services/appointment";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function CreateAppointmentModal() {
    const navigate = usePreserveSearchNavigation();
    const queryClient = useQueryClient();

    const { toast } = useToast();

    const form = useForm<AppointmentForm>({
        resolver: zodResolver(appointmentFormSchema),
    });

    const { mutate, isPending, isSuccess } = useMutation({
        onError: ({ response }: ApiValidationError) =>
            toast({
                title: "Error",
                description: response?.data.message,
                variant: "destructive",
            }),
        onSuccess: (data) => {
            toast({
                title: "Turno agregado",
                description: `${format(data.date, "dd 'de' LLLL", { locale: es })} a las ${format(data.time, "HH:mm", { locale: es })}`,
                variant: "default",
            });
            queryClient.invalidateQueries({ queryKey: ["appointments"] });
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
