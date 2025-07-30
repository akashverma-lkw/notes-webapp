import express from "express";
import { createNote, getNotes, deleteNote } from "../controllers/noteController";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", protect as any, createNote);
router.get("/", protect as any, getNotes);
router.delete("/:id", protect as any, deleteNote);

export default router;
