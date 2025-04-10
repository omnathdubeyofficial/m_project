
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file"); // "image" ko "file" change kiya taki image aur pdf dono accept ho sake

    if (!file) {
      return new Response(JSON.stringify({ error: "No file uploaded" }), {
        status: 400,
      });
    }

    // ✅ 1. Validate MIME type (Only allow images and PDFs)
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

    const fileUrl = `/uploads/${uniqueName}`;

    return new Response(JSON.stringify({ fileUrl }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
