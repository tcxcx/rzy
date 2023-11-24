const { gql } = require('apollo-server-express');

// GraphQL Type Definitions
const typeDefs = gql`
  type TokenBalance {
    wallet_address: String!
    balance: Float!
    last_updated: String
  }

  type Query {
    tokenBalances: [TokenBalance]
  }
`;

// Resolvers
const resolvers = {
  Query: {
    tokenBalances: async (_, __, { supabase }) => {
      const { data, error } = await supabase
        .from('tokenBalances')
        .select('*');

      if (error) {
        console.error(error);
        return [];
      }

      return data;
    },
  },
};

module.exports = { typeDefs, resolvers };
