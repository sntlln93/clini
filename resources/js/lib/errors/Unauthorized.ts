import { AuthenticatedUser } from "@/types/auth";

export class UnauthorizedError extends Error {
    constructor(private user: AuthenticatedUser, private pathname: string) {
        super("No estás authorizado para ver esta página");
    }

    /**
     * Send error to backend?
     */
    log() {
        return "hello " + this.message;
    }
}
