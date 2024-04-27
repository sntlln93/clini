import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/features/Auth/LogoutButton";
import { LogOutIcon } from "lucide-react";
import { Link } from "react-router-dom";

export function WelcomePage() {
    return (
        <div className="text-slate-100 fixed flex flex-col justify-center items-center inset-0 bg-slate-800">
            <div className="flex flex-row gap-5">
                <Button asChild>
                    <Link to="/login">login</Link>
                </Button>
                <LogoutButton>
                    <Button variant={"destructive"} size={"icon"}>
                        <LogOutIcon />
                    </Button>
                </LogoutButton>
                <Button asChild>
                    <Link to="/">home</Link>
                </Button>
            </div>
            <h1>hello from /</h1>
        </div>
    );
}
