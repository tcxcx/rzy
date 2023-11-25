import { Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import React, { useMemo } from "react";

export default function TableHead({ users, isLoading }) {
    const [page, setPage] = React.useState(1);
    const rowsPerPage = 10;

    const pages = useMemo(() => {
        if (users) {
            return Math.ceil(users.length / rowsPerPage);
        } else {
            return 0;
        }
    }, [users]);

    const items = useMemo(() => {
        if (users) {
            const start = (page - 1) * rowsPerPage;
            const end = start + rowsPerPage;
            return users.slice(start, end);
        } else {
            return [];
        }
    }, [page, users]);
    const getRowColor = (index) => {
        switch (index) {
            case 0: return 'text-clr-2';
            case 1: return 'text-clr-1';
            case 2: return 'text-clr-4';
            default: return '';
        }
    };

    if (isLoading) {
        return null; // Or some loading indicator
    }

    return (
        <Table
            bottomContent={
                <div className="flex w-full justify-end pt-4 font-aeonik text-basement-green">
                    <Pagination
                        isCompact
                        showControls
                        showShadow
                        color="--clr-1"
                        page={page}
                        total={pages}
                        onChange={(page) => setPage(page)}
                    />
                </div>
            }
            classNames={{
                wrapper: "min-h-[222px] font-basement",
            }}
        >
            <TableHeader>
                <TableColumn className="text-black-tr" key="position">POSITION</TableColumn>
                <TableColumn className="text-black-tr" key="wallet">WALLET</TableColumn>
                <TableColumn className="text-black-tr" key="tokens">TOKENS</TableColumn>
            </TableHeader>
            <TableBody>
                {items.map((item, index) => (
                    <TableRow key={item.key} className={getRowColor(index)}>
                        <TableCell>{index + 1 + (page - 1) * rowsPerPage}</TableCell>
                        <TableCell>{item.wallet}</TableCell>
                        <TableCell>{item.tokens}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
