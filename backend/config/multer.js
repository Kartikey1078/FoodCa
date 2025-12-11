import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinaryConfig.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "mern_uploads", // folder name in cloudinary
    allowed_formats: ["jpeg", "jpg", "png"],
  },
});

const upload = multer({ storage });

export default upload;
