import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

// Function to verify the JWT
const verifyToken = (token) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing");
  }
  
  return jwt.verify(token, process.env.JWT_SECRET, {
    issuer: process.env.JWT_ISSUER,
    audience: process.env.JWT_AUDIENCE,
  });
};

// Function to get user data from authToken stored in cookies
const getUserDataFromToken = async (req) => {
  try {
    const authToken = req.cookies?.authToken;

    if (!authToken) {
      throw new Error("No authToken provided in cookies");
    }

    console.log("Received authToken:", authToken);

    const decodedToken = verifyToken(authToken);
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
    return { error_msg: "Failed to fetch user data" }; // More generic error message
  } finally {
    console.log("Disconnecting Prisma client...");
    // Optional: Only disconnect if you are not reusing the client elsewhere
    await prisma.$disconnect();
    console.log("Prisma client disconnected.");
  }
};

export { getUserDataFromToken };
