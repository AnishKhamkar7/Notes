import { Request, Response } from "express";
import ErrorFactory from "../errors";
import ApiResponse from "../http/ApiResponse";
import { StatusCodes } from "http-status-codes";
import handleApiResponse from "../http/handleApiResponse";
import { Note } from "../models/notes.model";
import { ResolveFnOutput } from "module";

export default class NotesController {
  addNote = async (req: Request, res: Response) => {
    const { title, content, tags } = req.body;
    const { userId } = req;

    if (!title || !content) {
      throw ErrorFactory.badRequestError(
        "Title and Content are required Fields"
      );
    }

    const note = await Note.create({
      title,
      content,
      tag: tags || [],
      userId,
    });

    const response = ApiResponse.success({
      data: { note },
      message: "Note Added Successfully",
      statusCode: StatusCodes.CREATED,
    });
    handleApiResponse(res, response);
  };

  editNote = async (req: Request, res: Response) => {
    const { title, content, tags, isPinned } = req.body;
    const { userId } = req;
    const { noteId } = req.params;

    const note = await Note.findById({ _id: noteId });

    if (!note) {
      throw ErrorFactory.notFoundError("NoteId invalid or not Found");
    }

    if (title) note.title = title;
    if (content) note.content = content;
    if (tags) note.tags = tags;
    if (isPinned) note.isPinned = isPinned;

    const updatedNote = await note.save();

    const response = ApiResponse.success({
      data: { updatedNote },
      message: "Note Updated Successfully",
      statusCode: StatusCodes.CREATED,
    });
    handleApiResponse(res, response);
  };

  viewAllNotes = async (req: Request, res: Response) => {
    const { userId } = req;

    const notes = await Note.find({ userId }).sort({ isPinned: -1 });

    const response = ApiResponse.success({
      data: notes,
      message: "All notes retrieved Successfully",
      statusCode: StatusCodes.CREATED,
    });
    handleApiResponse(res, response);
  };

  deleteNote = async (req: Request, res: Response) => {
    const { noteId } = req.params;
    const { userId } = req;

    const note = await Note.findById({ _id: noteId });

    if (!note) {
      throw ErrorFactory.notFoundError("Note ID invalid or Not Found");
    }

    await Note.deleteOne({ _id: noteId });

    const response = ApiResponse.success({
      data: null,
      message: "Note delete Successfully",
      statusCode: StatusCodes.CREATED,
    });
    handleApiResponse(res, response);
  };

  updatePinnedNotes = async (req: Request, res: Response) => {
    const { noteId } = req.params;
    const { userId } = req;
    const { isPinned } = req.body;

    const note = await Note.findById({ _id: noteId });

    if (!note) {
      throw ErrorFactory.notFoundError("NoteId invalid or not Found");
    }

    if (isPinned) note.isPinned = isPinned || false;

    const updatedNote = await note.save();

    const response = ApiResponse.success({
      data: { updatedNote },
      message: "Note Updated Successfully",
      statusCode: StatusCodes.CREATED,
    });
    handleApiResponse(res, response);
  };
}
