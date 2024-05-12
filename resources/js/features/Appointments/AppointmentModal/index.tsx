import { openAppointmentAtom } from "@/stores/ui";
import { useAtom } from "jotai";
import { Button } from "@/components/ui/button";
import Modal from "@/features/Modal";
import { Heading } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Patient } from "@/types/entities";
import { es } from "date-fns/locale";
import { AppointmentStatus } from "../components/AppointmentStatus";
import { AppointmentType } from "../components/AppointmentType";
import { WhatsappIcon } from "@/components/icons/WhatsappIcon";
import { Link } from "react-router-dom";
import { Pen } from "lucide-react";

export function AppointmentModal() {
    const [appointment, setAppointment] = useAtom(openAppointmentAtom);

    const closeSelf = () => {
        setAppointment(null);
    };

    return (
        <Modal handleClose={closeSelf} closeOnBackDrop={true}>
            <main className="grid gap-2 mb-2">
                <div className="bg-sky-500 gap-5 rounded-xl p-3 text-primary-foreground">
                    <div className="flex justify-end gap-2">
                        <Link
                            to={`https://wa.me/${appointment!.phone}`}
                            target="_blank"
                        >
                            <Badge className="bg-primary/70 py-1">
                                {appointment!.phone}
                                <WhatsappIcon className="h-5 w-5 ml-2" />
                            </Badge>
                        </Link>
                        <AppointmentType appointmentType={appointment!.type} />
                    </div>
                    <div>
                        <span>Fecha</span>
                        <Heading variant="h4" className="flex items-center">
                            {format(appointment!.date, "dd 'de' LLLL", {
                                locale: es,
                            })}{" "}
                            a las {format(appointment!.time, "HH:mm")} (
                            <span className="font-light text-sm">
                                <AppointmentStatus
                                    slim
                                    date={appointment!.date}
                                    status={appointment!.status}
                                    time={appointment!.time}
                                />
                            </span>
                            )
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

                    <div className="flex justify-end gap-2 mt-2">
                        <Button variant="secondary" size="sm">
                            <span>Modificar</span>
                            <Pen className="h-4 w-4 ml-2" />
                        </Button>
                    </div>
                </div>
            </main>
            <PatientInfo patient={appointment!.patient} />
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
                <Heading variant="h4">
                    {Number(patient.dni).toLocaleString("es-ES")}
                </Heading>
            </div>

            <div>
                <span>Fecha de nacimiento</span>
                <Heading variant="h4">
                    {format(patient.dateOfBirth, "dd-LL-yyyy")}
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
