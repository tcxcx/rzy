import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import TableHead from '../../../components/Leaderboard/TableHead';
import { GET_TOKEN_BALANCES } from './queries'; // Define this query

const Leaderboard = () => {
  const { data, loading, startPolling, stopPolling } =
    useQuery(GET_TOKEN_BALANCES);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Check if data exists and has the expected structure
    if (data && data.tokenBalances && Array.isArray(data.tokenBalances)) {
      setUsers(data.tokenBalances);
    }
  }, [data]);

  useEffect(() => {
    startPolling(5000); // Poll every 5 seconds
    return () => stopPolling();
  }, [startPolling, stopPolling]);

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle empty data
  if (!users || users.length === 0) {
    return <div>No data available.</div>;
  }

  return <TableHead users={users} isLoading={loading} />;
};

export default Leaderboard;
