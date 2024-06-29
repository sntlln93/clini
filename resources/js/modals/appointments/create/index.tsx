import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Modal from "@/features/Modal";
import { Spinner } from "@/components/Spinner";
import { useEffect } from "react";
import { usePreserveSearchNavigation } from "@/lib/hooks/usePreserveSearchNavigation";
import {
    AppointmentDatePicker,
    AppointmentTimePicker,
    AppointmentDurationSelect,
    AppointmentTypeSelect,
} from "@/features/Appointments/form";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SelectPatient } from "@/components/form/select-patient";
import { Textarea } from "@/components/ui/textarea";
import { OptionalLabel } from "@/components/form/optional-label";
import { useCreate } from "./useCreate";

export default function CreateAppointmentModal() {
    const navigate = usePreserveSearchNavigation();
    const { onSubmit, isPending, isSuccess, form } = useCreate();

    useEffect(() => {
        if (isSuccess) {
            closeSelf();
        }
    }, [isSuccess]);

    const closeSelf = () => {
        navigate({ modal: undefined });
    };

    return (
        <Modal open={true} handleClose={closeSelf} title="Nuevo Turno">
            <Form {...form}>
                <form
                    className="grid gap-5"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FormField
                        control={form.control}
                        name="patientId"
                        render={() => <SelectPatient form={form} />}
                    />

                    <div className="flex gap-2">
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <AppointmentDatePicker field={field} />
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="time"
                            render={({ field }) => (
                                <AppointmentTimePicker field={field} />
                            )}
                        />
                    </div>

                    <div className="flex gap-2">
                        <FormField
                            control={form.control}
                            name="duration"
                            render={({ field }) => (
                                <AppointmentDurationSelect field={field} />
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <AppointmentTypeSelect field={field} />
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Teléfono</FormLabel>
                                <FormControl>
                                    <Input
                                        autoComplete="off"
                                        placeholder="351789645"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Un número válido consiste de exactamente 10
                                    dígitos numéricos incluyendo el código de
                                    área.
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
