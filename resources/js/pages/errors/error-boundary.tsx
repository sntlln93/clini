import { UnauthorizedError } from "@/lib/errors/Unauthorized";
import { Link, useNavigate, useRouteError } from "react-router-dom";
import { Unauthorized } from "./unauthorized";
import { ErrorLayout } from "./layout";
import { Heading } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";

export function ErrorBoundary() {
    let error = useRouteError();
    const navigate = useNavigate();

    if (error instanceof UnauthorizedError) {
        return <Unauthorized />;
    }

    return (
        <ErrorLayout>
            <Heading variant="h1">Algo salió mal.</Heading>
            <div className="flex flex-row gap-2">
                <Button asChild variant="outline">
                    <Link to="/">Volvé al inicio</Link>
                </Button>
                <Button onClick={() => navigate(-1)}>Volvé hacia atrás</Button>
            </div>
        </ErrorLayout>
    );
}
