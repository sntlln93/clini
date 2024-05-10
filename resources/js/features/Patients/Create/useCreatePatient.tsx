import { SyntheticEvent, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    type CreatePatientFormValues,
    createPatientInitialValues,
    createPatientSchema,
} from "./schema";
import { useSetAtom } from "jotai";
import { showCreatePatientModalAtom } from "@/stores/ui";
import { useToast } from "@/components/ui/use-toast";
import { ApiValidationError } from "@/types/api";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { toPhpStrtotimeFormat } from "@/lib/utils";
import { Patient } from "@/types/entities";
import { useSession } from "@/lib/contexts/auth.context";

const API_URL = "api";

type CreatePatientPayload = {
    payload: CreatePatientFormValues;
    token: string;
};

const createPatient = async ({
    payload,
    token,
}: CreatePatientPayload): Promise<Patient> => {
    const { address_line, city, ...patient } = payload;

    const response = await axios.post(
        `${API_URL}/patients`,
        {
            patient: {
                ...patient,
                date_of_birth: toPhpStrtotimeFormat(patient.date_of_birth),
            },
            address: { address_line, city },
        },
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );

    return response.data;
};

export function useCreatePatientAction() {
    const { session } = useSession();
    const setShowCreatePatient = useSetAtom(showCreatePatientModalAtom);

    const { toast } = useToast();

    const { mutate, isPending } = useMutation({
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
            setShowCreatePatient(false);
        },
        mutationFn: (variables: CreatePatientFormValues) =>
            createPatient({ payload: variables, token: session! }),
    });

    return {
        mutate,
        isPending,
    };
}

export function useCreatePatientForm() {
    const [step, setStep] = useState(1);

    const form = useForm<CreatePatientFormValues>({
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
