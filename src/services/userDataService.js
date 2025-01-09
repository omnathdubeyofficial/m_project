import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Get all users
const getUsersData = async () => {
  return await prisma.usersdata.findMany();
};

// Create a new user
const createUserData = async (name, email, age) => {
  return await prisma.usersdata.create({
    data: { name, email, age },
  });
};

// Update an existing user by ID
const updateUserData = async (id, name, email, age) => {
  return await prisma.usersdata.update({
    where: { id: parseInt(id) },  // id ko integer me convert karna
    data: { name, email, age },
  });
};


// Delete a user by ID
const deleteUserData = async (id) => {
  return await prisma.usersdata.delete({
    where: { id: parseInt(id) },
  });
};

export { getUsersData, createUserData, updateUserData, deleteUserData };
