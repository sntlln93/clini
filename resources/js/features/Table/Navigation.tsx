import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

export function Navigation({
    totalPages,
    currentPage,
    toPage,
}: NavigationProps) {
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => toPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, index) => {
                    if (
                        index < 2 ||
                        index > totalPages - 2 ||
                        Math.abs(currentPage - 1 - index) <= 2
                    ) {
                        return (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    isActive={currentPage === index + 1}
                                    onClick={() => toPage(index + 1)}
                                >
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        );
                    }
                    if (Math.abs(currentPage - 1 - index) === 3) {
                        return (
                            <PaginationItem key={index}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        );
                    }
                    return null;
                })}
                <PaginationItem>
                    <PaginationNext
                        onClick={() => toPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}

type NavigationProps = {
    totalPages: number;
    currentPage: number;
    toPage: (page: number) => void;
};
