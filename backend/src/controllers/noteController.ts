import { Response } from "express";
import Note from "../models/Note";
import { AuthRequest } from "../middlewares/authMiddleware";

export const createNote = async (req: AuthRequest, res: Response) => {
  try {
    const { title } = req.body;
    if (!req.user?.id) return res.status(401).json({ message: "Unauthorized" });
    if (!title) return res.status(400).json({ message: "Title is required" });

    const note = await Note.create({
      title,
      user: req.user.id,
    });

    res.status(201).json(note);
  } catch (error) {
    console.error("Create note error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getNotes = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.id) return res.status(401).json({ message: "Unauthorized" });

    const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Get notes error:", error);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
};

export const deleteNote = async (req: AuthRequest, res: Response) => {
  try {
    const noteId = req.params.id;

    if (!req.user?.id) return res.status(401).json({ error: "Unauthorized" });

    const note = await Note.findOne({ _id: noteId, user: req.user.id });

    if (!note) {
      return res.status(404).json({ error: "Note not found or unauthorized" });
    }

    await note.deleteOne();
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Delete note error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
