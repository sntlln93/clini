import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/")({
    component: WelcomePage,
});

function WelcomePage() {
    return <div className="w-full">something must go in here</div>;
}
