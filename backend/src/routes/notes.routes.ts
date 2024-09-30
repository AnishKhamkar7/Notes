import { Router } from "express";
import NotesController from "../controller/notes.controller";
import authMiddleware from "../middleware/auth.middleware";
import asyncHandler from "../utils/asyncHandler";

const router = Router();
const notesController = new NotesController();

router
  .route("/add")
  .post(authMiddleware, asyncHandler(notesController.addNote));

router
  .route("/edit/:noteId")
  .patch(authMiddleware, asyncHandler(notesController.editNote));

router
  .route("/all-notes")
  .get(authMiddleware, asyncHandler(notesController.viewAllNotes));

router
  .route("/:noteId")
  .delete(authMiddleware, asyncHandler(notesController.deleteNote));

router
  .route("/update-pin/:noteId")
  .patch(authMiddleware, asyncHandler(notesController.updatePinnedNotes));

router
  .route("/search-notes/")
  .get(authMiddleware, asyncHandler(notesController.searchNotes));

export default router;
