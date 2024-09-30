import { MdAdd } from "react-icons/md";
import NoteCard from "../../components/Cards/NoteCard";
import AddEditNotes from "./AddEditNotes";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import Navbar from "../../components/Navbar/Navbar";
import axiosInstance from "../../utils/axiosInstance";
import moment from "moment";
import EmptyCard from "../../components/Cards/EmptyCard";
import Icon from "../../assets/add-note-svgrepo-com.svg";
import Spinner from "../../components/Loader/Spinner";
import Icon2 from "../../assets/error-404.svg";

interface Note {
  _id: string;
  title: string;
  createdAt: Date;
  content: string;
  tags: string[];
  isPinned: boolean;
}

function Home() {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: {},
  });
  const [userInfo, setUserInfo] = useState({});
  const [allNotes, setAllNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSearch, setIsSearch] = useState(false);

  const handleEdit = (data1: {}) => {
    setOpenAddEditModal({
      isShown: true,
      type: "edit",
      data: data1,
    });
  };

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/api/users/get-user");

      if (response.data && response.data.data.user) {
        setUserInfo(response.data.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/api/notes/all-notes");

      if (response.data) {
        setAllNotes(response.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updatePinnedNotes = async (notesData: Note) => {
    const notesId = notesData._id;

    const response = await axiosInstance.patch(
      "api/notes/update-pin/" + notesId,
      {
        isPinned: !notesData.isPinned,
      }
    );

    if (response.data) {
      getAllNotes();
    }
  };

  const onSearchNote = async (query: string) => {
    const response = await axiosInstance.get("/api/notes/search-notes", {
      params: { query },
    });
    if (response.data) {
      setIsSearch(true);
      setAllNotes(response.data.data.matchingNotes);
      if (setAllNotes.length === 0) {
        setIsSearch(false);
      }
    }
  };

  const deleteNote = async (noteId: string) => {
    try {
      const response = await axiosInstance.delete("/api/notes/" + noteId);

      if (response.data) {
        getAllNotes();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo();
    getAllNotes();

    return () => {};
  }, []);

  return (
    <>
      <Navbar
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        getNotes={getAllNotes}
        setIsSearch={setIsSearch}
      />
      <div className="container mx-auto">
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <Spinner />
          </div>
        ) : allNotes.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 mt-8">
            {allNotes.map((item) => (
              <NoteCard
                key={item._id}
                title={item.title}
                date={moment(item.createdAt).format("Do MMM YYYY")}
                content={item.content}
                tags={item.tags.map((item) => `#${item} `)}
                isPinned={item.isPinned}
                onEdit={() => handleEdit(item)}
                onDelete={() => deleteNote(item._id)}
                onPinNote={() => updatePinnedNotes(item)}
              />
            ))}
          </div>
        ) : !isSearch ? (
          <EmptyCard
            imgSrc={Icon}
            message={
              "Start creating your first note ! Click the 'Add' button to get started!"
            }
          />
        ) : (
          <EmptyCard imgSrc={Icon2} message={"Oops! Notes Not Found"} />
        )}
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-gray-900 hover:bg-black absolute right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal({
            isShown: true,
            type: "add",
            data: {},
          });
        }}
      >
        <div className="text-[32px] text-white">
          <MdAdd />
        </div>
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          notesData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, data: {}, type: "add" });
          }}
          getAllNotes={getAllNotes}
        />
      </Modal>
    </>
  );
}

export default Home;
