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
      await updateTotalStudentsByClass(); // after rating is created
      await updateStudentRatingAverages();

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



const updateTotalStudentsByClass = async () => {
  try {
    const studentCounts = await prisma.student_rating.groupBy({
      by: ['class_assigned'],
      _count: {
        class_assigned: true,
      },
    });

    const updatePromises = studentCounts.map((item) => {
      return prisma.classes_data.updateMany({
        where: { class_title: item.class_assigned },
        data: {
          student_rating: `${item._count.class_assigned}`, // 👈 as string
        },
      });
    });

    await Promise.all(updatePromises);
    console.log("Total students per class updated successfully.");
  } catch (err) {
    console.error("Error updating total students per class:", err);
  }
};



const updateStudentRatingAverages = async () => {
  try {
    // Step 1: Get all ratings with their classes
    const ratings = await prisma.student_rating.findMany({
      select: {
        class_assigned: true,
        rating: true
      }
    });

    // Step 2: Process average manually
    const classMap = {};

    for (const entry of ratings) {
      const cls = entry.class_assigned;
      const rate = parseFloat(entry.rating);

      if (!classMap[cls]) {
        classMap[cls] = { total: 0, count: 0 };
      }

      classMap[cls].total += rate;
      classMap[cls].count += 1;
    }

    // Step 3: Update classes_data table
    const updatePromises = Object.entries(classMap).map(([classTitle, data]) => {
      const avgRating = (data.total / data.count).toFixed(2).toString();

      return prisma.classes_data.updateMany({
        where: { class_title: classTitle },
        data: {
          student_reviews: avgRating,
        },
      });
    });

    await Promise.all(updatePromises);
    console.log("✅ Class average ratings updated without using _avg");
  } catch (error) {
    console.error("❌ Error updating class average ratings:", error);
  }
};





export {
  getStudentRatings,
  createStudentRating,
  updateStudentRating,
  deleteStudentRating,
};
