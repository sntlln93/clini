import { Button, buttonVariants } from "@/components/ui/button";
import Modal from "@/features/Modal";
import { Heading } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { differenceInCalendarISOWeekYears, format } from "date-fns";
import { Patient } from "@/types/entities";
import { es } from "date-fns/locale";
import { WhatsappIcon } from "@/components/icons/WhatsappIcon";
import { Pen, Send } from "lucide-react";
import { Link, useLoaderData } from "@tanstack/react-router";
import { AppointmentType } from "@/features/Appointments/components/AppointmentType";
import { AppointmentStatus } from "@/features/Appointments/components/AppointmentStatus";
import { usePreserveSearchNavigation } from "@/lib/hooks/usePreserveSearchNavigation";
import { cn } from "@/lib/utils";

export function ShowAppointmentModal() {
    const navigate = usePreserveSearchNavigation();
    const appointment = useLoaderData({ from: "/_dashboard" });

    const closeSelf = () => {
        navigate({
            modal: undefined,
            appointmentId: undefined,
        });
    };

    return (
        <Modal open={true} handleClose={closeSelf}>
            <main className="grid gap-2 mb-2">
                <div className="flex gap-2">
                    <AppointmentType appointmentType={appointment.type} />
                    <AppointmentStatus
                        date={appointment.date}
                        status={appointment.status}
                        time={appointment.time}
                    />
                </div>
                <div className="bg-sky-500 gap-5 rounded-xl p-3 text-primary-foreground">
                    <div>
                        <span>Fecha</span>
                        <Heading variant="h5" className="flex items-center">
                            {format(appointment.date, "dd 'de' LLLL", {
                                locale: es,
                            })}{" "}
                            a las {format(appointment.time, "HH:mm")}
                        </Heading>
                    </div>

                    {appointment && appointment.notes ? (
                        <div>
                            <span>Notas</span>
                            <p className="text-sm">{appointment.notes}</p>
                        </div>
                    ) : null}
                    {appointment && appointment.reason ? (
                        <div>
                            <span>Motivo</span>
                            <p className="text-sm">{appointment.reason}</p>
                        </div>
                    ) : null}

                    <div className="flex justify-end gap-2 mt-3">
                        <Link
                            search={{
                                modal: "appointment.edit",
                                appointmentId: appointment.id,
                            }}
                            className={cn(
                                buttonVariants({
                                    variant: "secondary",
                                    size: "sm",
                                }),
                                "text-sm",
                            )}
                        >
                            <span>Modificar</span>
                            <Pen className="h-4 w-4 ml-2" />
                        </Link>
                        <Link
                            className={cn(
                                buttonVariants({
                                    size: "sm",
                                }),
                                "bg-[#25d366] text-sm text-[#075e54]",
                                "hover:bg-[#005d4b] text-sm hover:text-[#dcf8c6]",
                            )}
                            to={`https://wa.me/+549${appointment.phone.split(" ").join("")}`}
                            target="_blank"
                        >
                            <WhatsappIcon className="h-4 w-4" />
                            <span className="mx-2">{appointment.phone}</span>
                            <Send className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </main>
            <PatientInfo patient={appointment.patient} />
            <Modal.Actions>
                <Button className="ml-auto" onClick={closeSelf}>
                    Cerrar
                </Button>
            </Modal.Actions>
        </Modal>
    );
}

function PatientInfo({ patient }: { patient: Patient }) {
    return (
        <section className="grid gap-2">
            <div>
                <span>Nombre</span>
                <Heading variant="h4">
                    {patient.fullName}
                    <Badge className="ml-2">{patient.sex}</Badge>
                </Heading>
            </div>

            <div>
                <span>N° de documento</span>
                <Heading variant="h4">{patient.dni}</Heading>
            </div>

            <div>
                <span>Fecha de nacimiento</span>
                <Heading variant="h4">
                    {`${format(patient.dateOfBirth, "dd-LL-yyyy")} (${differenceInCalendarISOWeekYears(Date.now(), patient.dateOfBirth)} años)`}
                </Heading>
            </div>

            <div>
                <span>Obra social</span>
                <Heading variant="h4">
                    <div className="flex gap-2 items-center">
                        {patient.healthcare ? (
                            <>
                                <img
                                    src="https://7694067.fs1.hubspotusercontent-na1.net/hubfs/7694067/Osde-logo%20ok.png"
                                    className="h-3"
                                />
                                {patient.healthcare.toUpperCase()}
                            </>
                        ) : null}
                    </div>
                </Heading>
            </div>
        </section>
    );
}
