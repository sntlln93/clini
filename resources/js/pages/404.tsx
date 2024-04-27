import { InlineLogo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/typography";
import { Link } from "react-router-dom";

export function NotFoundPage() {
    return (
        <div className="h-screen flex flex-col gap-10 justify-center items-center">
            <InlineLogo />
            <Heading variant="h1">Parece que te perdiste</Heading>
            <Button>
                <Link to="/">Volvé al inicio</Link>
            </Button>
        </div>
    );
}
