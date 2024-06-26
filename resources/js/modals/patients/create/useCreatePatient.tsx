import { SyntheticEvent, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    type CreatePatientForm,
    createPatientInitialValues,
    createPatientSchema,
} from "./schema";
import { useToast } from "@/components/ui/use-toast";
import { ApiValidationError } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import { createPatient } from "@/lib/services/patient";

export function useCreatePatientAction() {
    const { toast } = useToast();

    const { mutate, isPending, isSuccess } = useMutation({
        onError: ({ response }: ApiValidationError) =>
            toast({
                title: "Error",
                description: response?.data.message,
                variant: "destructive",
            }),
        onSuccess: (data) => {
            toast({
                title: "Paciente agregado",
                description: `Paciente ${data.fullName} agregado con éxito`,
                variant: "default",
            });
        },
        mutationFn: (variables: CreatePatientForm) => createPatient(variables),
    });

    return {
        mutate,
        isPending,
        isSuccess,
    };
}

export function useCreatePatientForm() {
    const [step, setStep] = useState(1);

    const form = useForm<CreatePatientForm>({
        resolver: zodResolver(createPatientSchema),
        defaultValues: createPatientInitialValues,
    });

    // Check for errors on first step and navigate to it
    useEffect(() => {
        if (
            form.formState.errors.dni ||
            form.formState.errors.names ||
            form.formState.errors.lastname ||
            form.formState.errors.date_of_birth ||
            form.formState.errors.healthcare ||
            form.formState.errors.sex
        ) {
            setStep(1);
        }
    }, [form.formState.errors]);

    const toSecondStep = (event: SyntheticEvent) => {
        event.preventDefault();
        setStep(2);
    };
    const toFirstStep = (event: SyntheticEvent) => {
        event.preventDefault();
        setStep(1);
    };

    return {
        form,
        toSecondStep,
        toFirstStep,
        step,
    };
}
