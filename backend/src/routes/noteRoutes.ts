import express, { RequestHandler } from "express";
import { protect } from "../middlewares/authMiddleware";
import { createNote, getNotes, deleteNote } from "../controllers/noteController";

const router = express.Router();

router.post("/", protect as RequestHandler, createNote as RequestHandler);
router.get("/", protect as RequestHandler, getNotes as RequestHandler);
router.delete("/:id", protect as RequestHandler, deleteNote as RequestHandler);

export default router;
