import { Router } from "express";
import NotesController from "../controller/notes.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();
const notesController = new NotesController();

router.route("/add").post(authMiddleware, notesController.addNote);

router.route("/edit/:noteId").patch(authMiddleware, notesController.editNote);

router.route("/all-notes").get(authMiddleware, notesController.viewAllNotes);

router.route("/:noteId").delete(authMiddleware, notesController.deleteNote);

router
  .route("/:noteId")
  .patch(authMiddleware, notesController.updatePinnedNotes);

export default router;
