import { openAppointmentAtom } from "@/stores/ui";
import { useAtom } from "jotai";
import { Button } from "@/components/ui/button";
import Modal from "@/features/Modal";

export function AppointmentModal() {
    const [appointment, setAppointment] = useAtom(openAppointmentAtom);

    const closeSelf = () => {
        setAppointment(null);
    };

    return (
        <Modal handleClose={closeSelf} title="Turno">
            hola
            <Modal.Actions>
                <Button className="ml-auto" onClick={closeSelf}>
                    Cerrar
                </Button>
            </Modal.Actions>
        </Modal>
    );
}
