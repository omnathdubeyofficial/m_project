import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

// Get all Admins
const getAdminData = async () => {
  return await prisma.admin_data.findMany();
};

// Create a new Admin
const createAdminData = async (name, email, age) => {
  const z_id = uuidv4(); // Generate a unique ID
  return await prisma.admin_data.create({
    data: {
      z_id,
      name: String(name),
      email: String(email),
      age: String(age),
    },
  });
};

// Update an existing Admin by ID
const updateAdminData = async (z_id, name, email, age) => {
  return await prisma.admin_data.update({
    where: { z_id: String(z_id) },
    data: {
      name: String(name),
      email: String(email),
      age: String(age),
    },
  });
};

// Delete an Admin by ID
const deleteAdminData = async (z_id) => {
  return await prisma.admin_data.delete({
    where: { z_id: String(z_id) },
  });
};

export { getAdminData, createAdminData, updateAdminData, deleteAdminData };
