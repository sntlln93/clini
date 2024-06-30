import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/roadmap")({
    component: () => <div>Acá van las funcionalidades planeadas</div>,
});
