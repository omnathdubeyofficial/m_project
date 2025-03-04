import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { setUserDate, setUserTime } from './dateTimeService.js';
import { v4 as uuidv4 } from 'uuid';

// Get all users
const getBlogList = async () => {
  return await prisma.blog_list.findMany();
};

// Create a new user
const createBlogList = async ({ title, slug, date_time_zone, author_name, content, tags, category, featured_image, comments, meta_title, meta_description, meta_keywords }) => {
  try {
    const createdData = await prisma.blog_list.create({
      data: { z_id: uuidv4(), title, slug, date_time_zone, author_name, content, tags, category, featured_image, views: "0", likes: "0", comments, meta_title, meta_description, meta_keywords, cdate: setUserDate(), ctime: setUserTime() },
    });
    const success_msg = "Blog created successfully."
    return { ...createdData, success_msg }
  } catch (e) {
    const error_msg = `${e}`
    console.error(error_msg)
    return { error_msg }
  } finally {
    prisma.$disconnect()
  }
};

const updateBlogList = async ({ z_id, title, slug, date_time_zone, author_name, content, tags, category, featured_image, isLike, isView, comments, meta_title, meta_description, meta_keywords }) => {
  try {
    console.log("The is like input is:", isLike)
    console.log("The is view input is:", isView)
    const blogData = await prisma.blog_list.findFirst({
      where: {
        z_id
      }
    });
    console.log("The respective blog data is:", blogData)

    const likeCount = (isLike) => {
      let currentLikes = parseInt(blogData.likes);
      if (isLike && isLike.toLowerCase() === "true") {
        currentLikes++;
      }
      if (isLike && isLike.toLowerCase() == "false") {
        if (currentLikes > 0) {
          currentLikes--;
        }
      }
      return currentLikes.toString();
    }

    const viewsCount = (isView) => {
      let currentViews = parseInt(blogData.views);
      console.log("**Current views are:", currentViews)
      if (isView && isView.toLowerCase() === "true") {
        currentViews++;
      }
      if (isView && isView.toLowerCase() == "false") {
        if (currentViews > 0) {
          currentViews--;
        }
      }
      return currentViews.toString();
    }

    const updatedData = await prisma.blog_list.update({
      where: { z_id },
      data: { title, slug, date_time_zone, author_name, content, tags, category, featured_image, views: viewsCount(isView), likes: likeCount(isLike), comments, meta_title, meta_description, meta_keywords, udate: setUserDate(), utime: setUserTime() },
    });
    const success_msg = "Blog list updated successfully."
    return { ...updatedData, success_msg }
  } catch (err) {
    const error_msg = `${err}`
    console.error(error_msg)
    return { error_msg }
  } finally {
    prisma.$disconnect()
  }
};


// Delete a user by ID
const deleteBlogList = async ({ z_id }) => {
  try {
    console.log("z_id :", z_id)
    const deletedData = await prisma.blog_list.delete({
      where: { z_id },
    });
    const success_msg = "Blog list deleted successfully."
    return { ...deletedData, success_msg }
  } catch (err) {
    const error_msg = `${err}`
    console.error(error_msg)
    return { error_msg }
  } finally {
    prisma.$disconnect()
  }
};

export { getBlogList, createBlogList, updateBlogList, deleteBlogList };
