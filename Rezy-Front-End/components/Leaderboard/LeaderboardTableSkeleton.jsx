import { Skeleton, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import React from 'react';

const LeaderboardTableSkeleton = () => {
    const skeletonRows = 10;

    return (
        <Table>
            <TableHeader>
                <TableColumn>POSITION</TableColumn>
                <TableColumn>WALLET</TableColumn>
                <TableColumn>TOKENS</TableColumn>
                <TableColumn>TEAM</TableColumn>
            </TableHeader>
            <TableBody>
                {Array.from({ length: skeletonRows }).map((_, index) => (
                    <TableRow key={index}>
                        <TableCell><Skeleton /></TableCell>
                        <TableCell><Skeleton /></TableCell>
                        <TableCell><Skeleton /></TableCell>
                        <TableCell><Skeleton /></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default LeaderboardTableSkeleton;
