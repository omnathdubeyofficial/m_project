import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

// Apollo Client setup
const client = new ApolloClient({
  uri: 'http://localhost:10000/graphql', // Replace with your GraphQL server URL
  cache: new InMemoryCache(),
  credentials: "include",
});

// Function to execute GraphQL queries
export const executeQuery = async (query, variables = {}) => {
  try {
    const { data } = await client.query({
      query: gql(query),
      variables,
    });
    return data;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
};

// Function to execute GraphQL mutations
export const executeMutation = async (mutation, variables = {}) => {
  try {
    const { data } = await client.mutate({
      mutation: gql(mutation),
      variables,
    });
    return data;
  } catch (error) {
    console.error('Error executing mutation:', error);
    throw error;
  }
};

export default client;
