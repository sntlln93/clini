import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/typography";
import { Link, useNavigate } from "react-router-dom";
import { ErrorLayout } from "./layout";

export function Unauthorized() {
    const navigate = useNavigate();

    return (
        <ErrorLayout>
            <Heading variant="h1">
                No estás authorizado para ver esta página
            </Heading>
            <div className="flex flex-row gap-2">
                <Button asChild variant="outline">
                    <Link to="/">Volvé al inicio</Link>
                </Button>
                <Button onClick={() => navigate(-1)}>Volvé hacia atrás</Button>
            </div>
        </ErrorLayout>
    );
}
