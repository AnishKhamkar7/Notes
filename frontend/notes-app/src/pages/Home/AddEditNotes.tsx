import { useEffect, useState } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";
import { notesSchema, NotesSchema } from "../../validation/notes/notes";

function AddEditNotes({
  notesData,
  type,
  onClose,
}: {
  notesData: string;
  type: string;
  onClose: void;
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [error, setError] = useState<any | null>(null);

  const editNote = async () => {};

  const addNote = async () => {};

  const handleAddNote = () => {
    useEffect(() => {
      const data: NotesSchema = { title, content };
      const validateData = notesSchema.safeParse(data);

      if (!validateData.success) {
        const errorMessages = validateData.error.errors
          .map((error) => error.message)
          .join(" :: ");
        setError(errorMessages);
      } else {
        setError(null);
      }
    }, [title, content]);

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

      <button className="btn-primary font-medium mt-5 p-3" onClick={() => {}}>
        ADD
      </button>
    </div>
  );
}

export default AddEditNotes;
