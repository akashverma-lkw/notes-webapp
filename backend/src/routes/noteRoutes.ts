import express from "express";
import { createNote, getNotes, deleteNote } from "../controllers/noteController";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", protect, createNote);
router.get("/", protect, getNotes);
router.delete("/:id", protect, deleteNote);

export default router;
