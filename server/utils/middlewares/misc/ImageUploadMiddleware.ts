import multer from "multer";

const imageUploadMiddleware = multer({ storage: multer.memoryStorage() })

export default imageUploadMiddleware