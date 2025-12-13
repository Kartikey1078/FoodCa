import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinaryConfig.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "mern_uploads", // folder name in cloudinary
    allowed_formats: ["jpeg", "jpg", "png"],
    transformation: [
      { width: 1200, height: 1200, crop: "limit" }, // Limit image size
      { quality: "auto:good" }, // Auto optimize quality
    ],
  },
});

// File size limit: 5MB (Vercel limit is 4.5MB, so we use 5MB for safety)
const upload = multer({ 
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB in bytes
  },
  fileFilter: (req, file, cb) => {
    // Check file type
    if (file.mimetype === 'image/jpeg' || 
        file.mimetype === 'image/jpg' || 
        file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG, JPG, and PNG images are allowed'), false);
    }
  },
});

export default upload;
