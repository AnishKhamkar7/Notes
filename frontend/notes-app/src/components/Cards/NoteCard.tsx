import { MdCreate, MdDelete, MdOutlinePushPin } from "react-icons/md";

function NoteCard({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) {
  return (
    <div className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-sm font-medium">{title}</h6>
          <span className="text-sm text-slate-500">{date}</span>
        </div>
        <div
          className={`icon-btn ${isPinned ? "text-primary" : "text-slate-300"}`}
          onClick={onPinNote}
        >
          <MdOutlinePushPin />
        </div>
      </div>

      <p className="text-sx text-slate-600 mt-2">{content?.slice(0, 60)}</p>

      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-slate-500">{tags}</div>

        <div className="flex items-center gap-2">
          <div className="icon-btn hover:text-green-600" onClick={onEdit}>
            <MdCreate />
          </div>
          <div className="icon-btn hover:text-red-500" onClick={onDelete}>
            <MdDelete />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
