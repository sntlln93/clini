import { Link, createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    PracticeFields,
    RoleFields,
    UserFields,
} from "@/features/Auth/register";

import {
    Step,
    Stepper,
    useStepper,
    type StepItem,
} from "@/components/ui/stepper";
import {
    RegisterPracticeSchema,
    registerSchema,
} from "@/lib/schemas/register-practice.schema";
import { User } from "lucide-react";

export const Route = createFileRoute("/_auth/register")({
    component: RegisterPage,
});

const steps = [
    { label: "Cuenta", description: "esta es una descripcion", icon: User },
    { label: "Consultorio" },
    { label: "Actividad" },
] satisfies StepItem[];

export function RegisterPage() {
    const form = useForm<RegisterPracticeSchema>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            names: "",
            lastname: "",
            practiceName: "",
            specialties: [],
            roles: [],
        },
    });

    function onSubmit(values: RegisterPracticeSchema) {
        console.log(values);
    }

    return (
        <>
            <div className="flex flex-col h-screen mx-auto max-w-[640px] px-4 py-8 gap-6">
                <h1 className="text-2xl font-semibold tracking-tight text-center">
                    Con 3 pasos vas a empezar a organizar los turnos de tu
                    consultorio
                </h1>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col gap-4 h-full"
                    >
                        <Stepper
                            initialStep={0}
                            steps={steps}
                            orientation="horizontal"
                        >
                            <Step key={steps[0].label} {...steps[0]}>
                                <UserFields />
                            </Step>
                            <Step key={steps[1].label} {...steps[1]}>
                                <PracticeFields />
                            </Step>
                            <Step key={steps[2].label} {...steps[2]}>
                                <RoleFields />
                            </Step>
                            <Footer />
                        </Stepper>
                    </form>
                </Form>
            </div>
        </>
    );
}

const Footer = () => {
    const {
        nextStep,
        prevStep,
        isDisabledStep: isFirstStep,
        isLastStep,
    } = useStepper();
    return (
        <div className="w-full flex justify-end gap-2 mt-auto">
            <Button
                type="button"
                disabled={isFirstStep}
                onClick={prevStep}
                variant="secondary"
            >
                Anterior
            </Button>

            {isLastStep ? (
                <Button type="submit">Crear cuenta</Button>
            ) : (
                <Button type="button" onClick={nextStep}>
                    Siguiente
                </Button>
            )}
        </div>
    );
};
