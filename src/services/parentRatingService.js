import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { setUserDate, setUserTime } from './dateTimeService.js';
import { v4 as uuidv4 } from 'uuid';

// Get all Parent ratings
const getParentRatings = async () => {
  try {
    const ratings = await prisma.parent_rating.findMany();
    return ratings;
  } catch (err) {
    const error_msg = `${err}`;
    console.error(error_msg);
    return { error_msg };
  } finally {
    prisma.$disconnect();
  }
};

// Create a new Parent rating
const createParentRating = async ({
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
      const existingReview = await prisma.parent_rating.findFirst({
        where: { userid }
      });
  
      if (existingReview) {
        return { 
          error_msg: "You have already submitted a review. Please use update method to modify it." 
        };
      }
  
      const newRating = await prisma.parent_rating.create({
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
  
      await updateTotalParentByClass(); // after rating is created
      await updateParentRatingAverages();

      return { ...newRating, success_msg: "Review & Rating Submited successfully." };
    } catch (err) {
      const error_msg = `${err}`;
      console.error(error_msg);
      return { error_msg };
    } finally {
      prisma.$disconnect();
    }
  };
  

// Update Parent rating by z_id
const updateParentRating = async ({
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
    const updated = await prisma.parent_rating.update({
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

    return { ...updated, success_msg: "Parent rating updated successfully." };
  } catch (err) {
    const error_msg = `${err}`;
    console.error(error_msg);
    return { error_msg };
  } finally {
    prisma.$disconnect();
  }
};

// Delete Parent rating by z_id
const deleteParentRating = async ({ z_id }) => {
  try {
    const deleted = await prisma.parent_rating.delete({
      where: { z_id },
    });

    return { ...deleted, success_msg: "Parent rating deleted successfully." };
  } catch (err) {
    const error_msg = `${err}`;
    console.error(error_msg);
    return { error_msg };
  } finally {
    prisma.$disconnect();
  }
};




const updateTotalParentByClass = async () => {
  try {
    const studentCounts = await prisma.parent_rating.groupBy({
      by: ['class_assigned'],
      _count: {
        class_assigned: true,
      },
    });

    const updatePromises = studentCounts.map((item) => {
      return prisma.classes_data.updateMany({
        where: { class_title: item.class_assigned },
        data: {
          parents_rating: `${item._count.class_assigned}`, // 👈 as string
        },
      });
    });

    await Promise.all(updatePromises);
    console.log("Total students per class updated successfully.");
  } catch (err) {
    console.error("Error updating total students per class:", err);
  }
};



const updateParentRatingAverages = async () => {
  try {
    // Step 1: Get all ratings with their classes
    const ratings = await prisma.parent_rating.findMany({
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
          parents_reviews: avgRating,
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
  getParentRatings,
  createParentRating,
  updateParentRating,
  deleteParentRating,
};
