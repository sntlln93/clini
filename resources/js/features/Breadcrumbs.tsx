import { Link, Params, useMatches } from "react-router-dom";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

export function Breadcrumbs() {
    let matches = useMatches() as IMatches[];
    let crumbs = matches
        .filter((match) => Boolean(match.handle?.crumb))
        .map((match) => ({
            path: match.pathname,
            label: match.handle.crumb(),
        }));

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {crumbs.map((crumb, index) => {
                    if (index === crumbs.length - 1) {
                        return (
                            <BreadcrumbItem key={index}>
                                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                            </BreadcrumbItem>
                        );
                    }

                    return (
                        <React.Fragment key={index}>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link to={crumb.path}>{crumb.label}</Link>
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

type IMatches = {
    id: string;
    pathname: string;
    params: Params<string>;
    handle: {
        crumb: (param?: string) => React.ReactNode;
    };
};
