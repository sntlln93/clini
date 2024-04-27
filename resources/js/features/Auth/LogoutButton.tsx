import { useLogoutAction } from "./hooks/useLogout";
import { Spinner } from "@/components/Spinner";
import React from "react";

export function LogoutButton({ children }: Props) {
    const { attemptLogout, logoutIsPending } = useLogoutAction();

    // Clone the child element and inject the props
    const childWithProps = React.cloneElement(children, {
        onClick: attemptLogout,
        disabled: logoutIsPending,
        children: logoutIsPending ? (
            <Spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
            children.props.children
        ),
    });

    return childWithProps;
}

type Props = {
    children: React.ReactElement;
};
