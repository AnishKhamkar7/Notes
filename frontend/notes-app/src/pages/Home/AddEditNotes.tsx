import { useState } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";
import { notesSchema, NotesSchema } from "../../validation/notes/notes";

function AddEditNotes({
  notesData,
  type,
  onClose,
  getAllNotes,
}: {
  notesData: {
    _id?: string;
    title?: string;
    content?: string;
    tags?: string[];
  };
  type: string;
  onClose: () => void;
  getAllNotes: any;
}) {
  const [title, setTitle] = useState(notesData?.title || "");
  const [content, setContent] = useState(notesData?.content || "");
  const [tags, setTags] = useState<string[]>(notesData?.tags || []);
  const [error, setError] = useState<any | null>(null);

  const addNote = async () => {
    try {
      const response = await axiosInstance.post("/api/notes/add", {
        title,
        content,
        tags,
      });

      if (response.data) {
        getAllNotes();
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editNote = async () => {
    try {
      const noteId = notesData._id;

      const response = await axiosInstance.patch("/api/notes/edit/" + noteId, {
        title,
        content,
        tags,
      });

      if (response.data) {
        getAllNotes();
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddEditNote = () => {
    const data: NotesSchema = { title, content };
    const validateData = notesSchema.safeParse(data);

    if (!validateData.success) {
      const errorMessages = validateData.error.errors
        .map((error) => error.message)
        .join(" :: ");
      setError(errorMessages);
    }

    if (type === "edit") {
      editNote();
    } else {
      addNote();
    }
  };

  return (
    <div className="relative">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
        onClick={onClose}
      >
        <div className="text-xl text-slate-400">
          <MdClose />
        </div>
      </button>
      <div className="flex flex-col gap-2">
        <label className="input-label">TITLE</label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="Go To Gym At 5"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">CONTENT</label>
        <textarea
          typeof="text"
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          placeholder="Content"
          rows={10}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
      </div>

      <div>
        <label className="input-label">TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

      <button
        className="btn-primary font-medium mt-5 p-3"
        onClick={handleAddEditNote}
      >
        {type === "edit" ? "UPDATE" : "ADD"}
      </button>
    </div>
  );
}

export default AddEditNotes;
