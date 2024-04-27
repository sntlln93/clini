import { InlineLogo, SVGLogo } from "@/components/Logo";
import { LoginForm } from "@/features/Auth/LoginForm";
import { Link } from "react-router-dom";

export function LoginPage() {
    return (
        <>
            <InlineLogo />
            <div className="container relative h-[800px] justify-center">
                <div className="items-center flex h-full lg:p-8">
                    <div className="bg-white mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <SVGLogo
                            className={"w-[120px] h-[120px] mx-auto mb-5"}
                        />

                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Ingresa a tu cuenta
                            </h1>
                        </div>
                        <LoginForm />
                        <p className="text-right text-sm text-muted-foreground">
                            <Link
                                to="/forgot-password"
                                className="font-bold hover:text-primary"
                            >
                                ¿Olvidaste tu contraseña?
                            </Link>{" "}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
