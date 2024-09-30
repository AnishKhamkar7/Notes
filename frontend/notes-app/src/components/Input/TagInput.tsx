import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
type InputKey = React.KeyboardEvent<HTMLInputElement>;

interface TagInput {
  tags: string[];
  setTags: (tags: string[]) => void;
}

function TagInput({ tags, setTags }: TagInput) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: InputChangeEvent) => {
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e: InputKey) => {
    if (e.key === "Enter") {
      addNewTag();
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      {tags?.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-2 text-slate-900 text-slate-100 px-3 py-1 rounded"
            >
              #{tag}
              <button
                onClick={() => {
                  handleRemoveTag(tag);
                }}
              >
                <MdClose />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 mt-3">
        <input
          type="text"
          value={inputValue}
          className="text-sm bg-transparent border px-3 py-2 rounded outline-none"
          placeholder="Add tags"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />

        <button
          className="w-8 h-8 flex items-center justify-center rounded border border-blue-700 hover:bg-gray-200"
          onClick={() => {
            addNewTag();
          }}
        >
          <div className="text-2xl text-blue-700 hover:text-white">
            <MdAdd />
          </div>
        </button>
      </div>
    </div>
  );
}
export default TagInput;
