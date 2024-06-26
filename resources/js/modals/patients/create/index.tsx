import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Modal from "@/features/Modal";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Spinner } from "@/components/Spinner";
import { PatientFields } from "@/modals/patients/create/PatientFields";
import { AddressFields } from "@/modals/patients/create/AddressFields";
import {
    useCreatePatientAction,
    useCreatePatientForm,
} from "@/modals/patients/create/useCreatePatient";
import { useEffect } from "react";
import { usePreserveSearchNavigation } from "@/lib/hooks/usePreserveSearchNavigation";
import { CreatePatientForm } from "./schema";

export default function CreatePatientModal() {
    const navigate = usePreserveSearchNavigation();

    const { form, step, toSecondStep, toFirstStep } = useCreatePatientForm();
    const { mutate, isPending, isSuccess } = useCreatePatientAction();

    useEffect(() => {
        if (isSuccess) {
            closeSelf();
        }
    }, [isSuccess]);

    const closeSelf = () => {
        navigate({ modal: undefined });
    };

    const onSubmit = (values: CreatePatientForm) => {
        mutate(values);
    };

    return (
        <Modal open={true} handleClose={closeSelf} title="Nuevo Paciente">
            <Form {...form}>
                <form
                    className="grid gap-5"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    {step === 1 ? <PatientFields form={form} /> : null}
                    {step === 2 ? <AddressFields form={form} /> : null}

                    <Modal.Actions>
                        {step === 1 ? (
                            <>
                                <Button
                                    disabled={isPending}
                                    onClick={toSecondStep}
                                    className="ml-auto"
                                >
                                    Dirección <ChevronRight />
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    disabled={isPending}
                                    variant="outline"
                                    onClick={toFirstStep}
                                >
                                    <ChevronLeft /> Paciente
                                </Button>
                                <Button disabled={isPending}>
                                    {isPending && (
                                        <Spinner className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    Guardar
                                </Button>
                            </>
                        )}
                    </Modal.Actions>
                </form>
            </Form>
        </Modal>
    );
}
