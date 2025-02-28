import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import cors from 'cors';
import cookieParser from 'cookie-parser'; // Import cookie parser
import dotenv from 'dotenv';
dotenv.config();

import userType from './types/userType.js';
import userDataType from './types/userDataType.js';
import authTokantTypes from './types/authTokantTypes.js';
import userResolver from './resolvers/userResolver.js';
import userDataResolver from './resolvers/userDataResolver.js';
import adminDataResolver from './resolvers/AdminDataResolver.js';
import adminDataType from './types/AdminDataTypes.js';
import logoutTypes from './types/logoutTypes.js';
import userManagementType from './types/userManagementTypes.js';
import userManagementResolver from './resolvers/userManagementResolver.js';
import studentRegistrationTypes from './types/studentRegistrationType.js';
import studentRegistrationResolver from './resolvers/studentRegistrationResolver.js';
import attendanceTypes from './types/attendanceType.js';
import attendanceResolver from './resolvers/attendanceResolver.js';
import admissionFormType from './types/admissionFormTypes.js';
import admssionFormResolver from './resolvers/admissionFormResolver.js';
import authTokanResolver from './resolvers/authTokanResolver.js';
import securityType from './types/securityType.js';
import securityResolver from './resolvers/securityResolver.js';
import transportVehicleRegistrationType from './types/transportVehicleTypes.js';
import transportVehicleResolver from './resolvers/transportVehicleResolver.js';
import logoutResolver from './resolvers/logoutResolver.js';
import holidayListType from './types/holidayListTypes.js';
import holidayListResolver from './resolvers/holidayListResolver.js';
import phoneDirectoryType from './types/phoneDirectoryTypes.js';
import phoneDirectoryResolver from './resolvers/phoneDirectoryResolver.js';
import academicCalendarType from './types/academicCalendarTypes.js';
import academicCalendarResolver from './resolvers/academicCalendarResolver.js';

const app = express();

// ✅ CORS Configuration (Allow Credentials for Cookies)
app.use(cors({
  origin: 'http://localhost:3000', // Allow frontend origin
  credentials: true, // Allow cookies
}));

// ✅ Middleware for Cookies
app.use(cookieParser());
app.use(express.json());

// ✅ GraphQL Schema
const schema = makeExecutableSchema({
  typeDefs: [
    userType, userDataType, adminDataType, userManagementType,
    studentRegistrationTypes, attendanceTypes, admissionFormType,
    authTokantTypes, securityType, transportVehicleRegistrationType, logoutTypes, holidayListType, phoneDirectoryType, academicCalendarType
  ],
  resolvers: [
    userResolver, userDataResolver, adminDataResolver,
    userManagementResolver, studentRegistrationResolver, attendanceResolver,
    admssionFormResolver, authTokanResolver, securityResolver, transportVehicleResolver, logoutResolver, holidayListResolver, phoneDirectoryResolver, academicCalendarResolver
  ],
});

app.use(
  '/graphql',
  graphqlHTTP((req, res) => {
    console.log("🟢 Incoming GraphQL Request...");
    console.log("🍪 Cookies Received:", req.cookies);

    // Check if authToken is present in cookies
    const authToken = req.cookies.authToken || null;
    console.log("🔑 Extracted authToken from Cookies:", authToken);

    // Return the schema and context
    return {
      schema,
      graphiql: true,
      context: { req, res, authToken }, // Ensure context is being set correctly
    };
  })
);






// ✅ Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}/graphql`);
});
