import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { setUserDate, setUserTime } from './dateTimeService.js';
import { v4 as uuidv4 } from 'uuid';

// Get all student ratings
const getStudentRatings = async () => {
  try {
    const ratings = await prisma.student_rating.findMany();
    return ratings;
  } catch (err) {
    const error_msg = `${err}`;
    console.error(error_msg);
    return { error_msg };
  } finally {
    prisma.$disconnect();
  }
};

// Create a new student rating
const createStudentRating = async ({
    first_name,
    middle_name,
    last_name,
    userid,
    review,
    rating,
    class_assigned,
  }) => {
    try {
      // Check if the user has already submitted a review
      const existingReview = await prisma.student_rating.findFirst({
        where: { userid }
      });
  
      if (existingReview) {
        return { 
          error_msg: "You have already submitted a review. Please use update method to modify it." 
        };
      }
  
      const newRating = await prisma.student_rating.create({
        data: {
          z_id: uuidv4(),
          first_name,
          middle_name,
          last_name,
          userid,
          review,
          rating,
          class_assigned,
          cdate: setUserDate(),
          ctime: setUserTime(),
        },
      });
  
      return { ...newRating, success_msg: "Review & Rating Submited successfully." };
    } catch (err) {
      const error_msg = `${err}`;
      console.error(error_msg);
      return { error_msg };
    } finally {
      prisma.$disconnect();
    }
  };
  

// Update student rating by z_id
const updateStudentRating = async ({
  z_id,
  first_name,
  middle_name,
  last_name,
  userid,
  review,
  rating,
  class_assigned,
}) => {
  try {
    const updated = await prisma.student_rating.update({
      where: { z_id },
      data: {
        first_name,
        middle_name,
        last_name,
        userid,
        review,
        rating,
        class_assigned,
        udate: setUserDate(),
        utime: setUserTime(),
      },
    });

    return { ...updated, success_msg: "Student rating updated successfully." };
  } catch (err) {
    const error_msg = `${err}`;
    console.error(error_msg);
    return { error_msg };
  } finally {
    prisma.$disconnect();
  }
};

// Delete student rating by z_id
const deleteStudentRating = async ({ z_id }) => {
  try {
    const deleted = await prisma.student_rating.delete({
      where: { z_id },
    });

    return { ...deleted, success_msg: "Student rating deleted successfully." };
  } catch (err) {
    const error_msg = `${err}`;
    console.error(error_msg);
    return { error_msg };
  } finally {
    prisma.$disconnect();
  }
};

export {
  getStudentRatings,
  createStudentRating,
  updateStudentRating,
  deleteStudentRating,
};
