import { links } from "@/components/navigation-links";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link, useMatches } from "@tanstack/react-router";
import React from "react";

export function Breadcrumbs() {
    const matches = useMatches();
    const pathNames = matches.map((match) => match.pathname);
    const crumbs = Array.from(new Set(pathNames))
        .filter((path) => !path.endsWith("/") || path === "/")
        .map((crumb) => {
            return links.find((link) => link.href === crumb) ?? links[0];
        });

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {crumbs.map((crumb, index) => {
                    if (index === crumbs.length - 1) {
                        return (
                            <BreadcrumbItem key={index}>
                                <BreadcrumbPage>{crumb.title}</BreadcrumbPage>
                            </BreadcrumbItem>
                        );
                    }

                    return (
                        <React.Fragment key={index}>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link to={crumb.href}>{crumb.title}</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                        </React.Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
