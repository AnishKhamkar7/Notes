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
}
