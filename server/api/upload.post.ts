import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export default defineEventHandler(async (event) => {
    const body = await readMultipartFormData(event);
    if (!body || body.length === 0) {
        throw createError({ statusCode: 400, statusMessage: "No file uploaded" });
    }

    const file = body[0]; // Assuming single file upload
    if (!file.filename) {
        throw createError({ statusCode: 400, statusMessage: "Invalid file" });
    }

    const filename = `${Date.now()}-${file.filename}`;
    // Ensure we save to a public directory so it's accessible by the frontend
    // In Nuxt, 'public' folder contents are served at root path
    const uploadDir = join(process.cwd(), 'public', 'uploads');

    await mkdir(uploadDir, { recursive: true });

    const filePath = join(uploadDir, filename);
    await writeFile(filePath, file.data);

    return {
        success: true,
        url: `/uploads/${filename}`
    };
});
