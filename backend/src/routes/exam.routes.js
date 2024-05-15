import { Router } from "express";
import {
  createExam,
  getExams,
  getExamById,
  updateExam,
  deleteExam,
} from "../controllers/exam.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", verifyJWT, upload.array('files'), createExam);
router.get("/", verifyJWT, getExams);
router.get("/:id", verifyJWT, getExamById);
router.put("/:id", verifyJWT, upload.array('files'), updateExam); 
router.delete("/:id", verifyJWT, deleteExam);
//
export default router;
