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
import driversListType from './types/driversListTypes.js';
import driversListResolver from './resolvers/driverListResolver.js';
import addNewBookType from './types/addNewBookTypes.js';
import addNewBookResolver from './resolvers/addNewBookResolver.js'
import issuedBookType from './types/issuedBooksTypes.js';
import issuedBookResolver from './resolvers/issuedBooksResolver.js';
import housekeepingListType from './types/housekeepingFormTypes.js';
import housekeepingListResolver from './resolvers/housekeepingFormResolver.js';
import blogListType from './types/blogListTypes.js';
import blogListResolver from './resolvers/blogListResolver.js';
import eventCreationType from './types/eventCreationTypes.js';
import eventCreationResolver from './resolvers/eventCreationListResolver.js'
import eventRegistrationFormType from './types/eventRegistrationFormTypes.js';
import eventRegistrationResolver from './resolvers/eventRegistrationFormResolver.js'
import feeStructureDataType from './types/feeStructureDataTypes.js';
import feeStructureListResolver from './resolvers/feeStructureResolver.js'
import noticeBoardType from './types/noticeboardTypes.js';
import noticeBoardResolver from './resolvers/noticeBoardResolver.js';
import classesDataType from './types/classesDataTypes.js';
import classesDataResolver from './resolvers/classesDataResolver.js';
import nurseryAdmissionListType from './types/nurseryAdmissionListTypes.js';
import nurseryAdmissionResolver from './resolvers/nurseryAdmissionResolver.js';
import forgetpasswordTypes from './types/forgetpasswordTypes.js';
import forgetpasswordResolver from './resolvers/forgetpasswordResolver.js';

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
    authTokantTypes, securityType, transportVehicleRegistrationType,
    logoutTypes, holidayListType, phoneDirectoryType, academicCalendarType,
    driversListType, addNewBookType, issuedBookType, housekeepingListType,
    blogListType, eventCreationType, eventRegistrationFormType,
    feeStructureDataType, noticeBoardType, classesDataType, nurseryAdmissionListType,forgetpasswordTypes
  ],
  resolvers: [
    userResolver, userDataResolver, adminDataResolver,
    userManagementResolver, studentRegistrationResolver, attendanceResolver,
    admssionFormResolver, authTokanResolver, securityResolver,
    transportVehicleResolver, logoutResolver, holidayListResolver,
    phoneDirectoryResolver, academicCalendarResolver, driversListResolver,
    addNewBookResolver, issuedBookResolver, housekeepingListResolver,
    blogListResolver, eventCreationResolver, eventRegistrationResolver,
    feeStructureListResolver, noticeBoardResolver, classesDataResolver,
    nurseryAdmissionResolver,forgetpasswordResolver
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
