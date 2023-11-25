import React, { useEffect, useState } from 'react';
import LeaderboardTableSkeleton from './LeaderboardTableSkeleton';
import TableHead from './TableHead';
import { users } from "./data";

const LeaderBoardTable = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(users);
                }, 1000);
            });
        };

        fetchData().then(fetchedData => {
            setData(fetchedData);
            setIsLoading(false);
        });
    }, []);

    return (
        <>
            {isLoading ? <LeaderboardTableSkeleton /> : <TableHead users={data} />}
        </>
    );
};

export default LeaderBoardTable;
