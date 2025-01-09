import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getUsers = async () => {
  return await prisma.user.findMany();
};

const createUser = async (name, email, age) => {
  return await prisma.user.create({
    data: { name, email, age },
  });
};

export { getUsers, createUser };
