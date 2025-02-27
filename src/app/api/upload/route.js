


import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("image");

    if (!file) {
      return new Response(JSON.stringify({ error: "No file uploaded" }), {
        status: 400,
      });
    }

    // ✅ 1. Validate MIME type (Only allow images)
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return new Response(JSON.stringify({ error: "Invalid file type" }), {
        status: 400,
      });
    }

    // ✅ 2. Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // ✅ 3. Ensure uploads directory exists
    const uploadsDir = path.join(process.cwd(), "public/uploads");
    await mkdir(uploadsDir, { recursive: true });

    // ✅ 4. Generate Secure Unique Filename
    const fileExt = path.extname(file.name);
    const uniqueName = `${crypto.randomUUID()}${fileExt}`;
    const filePath = path.join(uploadsDir, uniqueName);

    // ✅ 5. Write file securely
    await writeFile(filePath, buffer);

    const imageUrl = `/uploads/${uniqueName}`;

    return new Response(JSON.stringify({ imageUrl }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}






// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export async function POST(req) {
//   try {
//     const formData = await req.formData();
//     const file = formData.get("image");

//     if (!file) {
//       return new Response(JSON.stringify({ error: "No file uploaded" }), {
//         status: 400,
//       });
//     }

//     // ✅ 1. Validate MIME type (Only allow images)
//     const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];
//     if (!ALLOWED_MIME_TYPES.includes(file.type)) {
//       return new Response(JSON.stringify({ error: "Invalid file type" }), {
//         status: 400,
//       });
//     }

//     // ✅ 2. Convert file to buffer
//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     // ✅ 3. Upload to Cloudinary (SECURE WAY)
//     const uploadResponse = await new Promise((resolve, reject) => {
//       cloudinary.uploader.upload_stream(
//         { folder: "uploads", resource_type: "image" }, // Cloudinary में `uploads` फोल्डर
//         (error, result) => {
//           if (error) reject(error);
//           else resolve(result);
//         }
//       ).end(buffer);
//     });

//     return new Response(JSON.stringify({ imageUrl: uploadResponse.secure_url }), {
//       status: 200,
//     });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: error.message }), {
//       status: 500,
//     });
//   }
// }
