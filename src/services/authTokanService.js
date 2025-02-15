import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// Function to get user data from authToken
const getUserDataFromToken = async ({ authToken }) => {
    try {
      if (!authToken) {
        throw new Error("No authToken provided");
      }
  
      console.log("Received authToken:", typeof authToken, authToken);
  
      const token = typeof authToken === "string" ? authToken : authToken?.authToken;
  
      if (!token) {
        throw new Error("Invalid authToken format");
      }
  
      if (!process.env.JWT_SECRET) {
        throw new Error("SECRET_KEY is missing");
      }
  
      console.log("SECRET_KEY found, proceeding with verification.");
  
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET, {
        issuer: process.env.JWT_ISSUER,
        audience: process.env.JWT_AUDIENCE,
      });
  
      console.log("Decoded Token:", decodedToken);
  
      const user = await prisma.user_management.findFirst({
        where: { userid: decodedToken.userid },
      });
  
      if (!user) {
        throw new Error("User not found");
      }
  
      return user;
    } catch (err) {
      console.error("Error while fetching user data from token:", err.message);
      return { error_msg: err.message };
    } finally {
      console.log("Disconnecting Prisma client...");
      await prisma.$disconnect();
      console.log("Prisma client disconnected.");
    }
  };
  

export { getUserDataFromToken };
