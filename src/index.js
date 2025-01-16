import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import cors from 'cors'; // Import CORS middleware
import userType from './types/userType.js';
import userDataType from './types/userDataType.js';
import userResolver from './resolvers/userResolver.js';
import userDataResolver from './resolvers/userDataResolver.js';
import adminDataResolver from './resolvers/AdminDataResolver.js';
import adminDataType from './types/AdminDataTypes.js';

const app = express();

// Use CORS middleware
app.use(cors({
  origin: 'http://localhost:3000', // Allow only your frontend
  credentials: true, // Allow cookies if needed
}));

// Combine all type definitions and resolvers
const schema = makeExecutableSchema({
  typeDefs: [userType, userDataType, adminDataType], // Combine all type definitions
  resolvers: [userResolver, userDataResolver, adminDataResolver], // Combine all resolvers
});

// GraphQL endpoint
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true, // Enable GraphiQL UI for testing
  })
);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/graphql`);
});
