import { gql } from '@apollo/client';

export const GET_TOKEN_BALANCES = gql`
  query GetTokenBalances {
    tokenBalances {
      wallet_address
      balance
      last_updated
    }
  }
`;
