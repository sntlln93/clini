import { showCreatePatientModalAtom } from "@/stores/ui";
import { useSetAtom } from "jotai";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Modal from "@/features/Modal";
import { PatientFields } from "./PatientFields";
import { AddressFields } from "./AddressFields";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { CreatePatientFormValues } from "./schema";
import {
    useCreatePatientAction,
    useCreatePatientForm,
} from "./useCreatePatient";
import { Spinner } from "@/components/Spinner";

export function CreatePatientModal() {
    const setShowCreatePatient = useSetAtom(showCreatePatientModalAtom);
    const { form, step, toSecondStep, toFirstStep } = useCreatePatientForm();
    const { mutate, isPending } = useCreatePatientAction();

    const closeSelf = () => {
        setShowCreatePatient(false);
    };

    const onSubmit = (values: CreatePatientFormValues) => {
        mutate(values);
    };

    return (
        <Modal handleClose={closeSelf} title="Nuevo Paciente">
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
