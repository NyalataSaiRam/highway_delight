import express from "express";
import {
  addExperience,
  findExperiences,
  getExperienceDetails,
  getExperiences,
} from "../controllers/experiences.js";

const router = express.Router();

router.get("/", getExperiences);
router.get("/find", findExperiences);
router.get("/:id", getExperienceDetails);

router.post("/", addExperience);

export default router;
