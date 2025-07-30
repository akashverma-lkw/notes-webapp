import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import logo from "../../public/assets/logo.png"; // Adjust if needed

interface Note {
  _id: string;
  title: string;
  createdAt: string;
}

interface User {
  name: string;
  email: string;
}

const Dashboard = () => {
  const [showInput, setShowInput] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteTitleInput, setNoteTitleInput] = useState("");
  const [user, setUser] = useState<User | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlToken = new URLSearchParams(location.search).get("token");
    if (urlToken) {
      localStorage.setItem("token", urlToken);
      window.history.replaceState({}, "", "/dashboard");
    }

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      fetchUser();
      fetchNotes();
    }
    // eslint-disable-next-line
  }, []);

  const API = import.meta.env.VITE_API_URL;

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${API}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUser(res.data);
    } catch (error) {
      setUser(null);
    }
  };

  const fetchNotes = async () => {
    try {
      const res = await axios.get(`${API}/api/notes`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setNotes(res.data);
    } catch (error: any) {
      if (error?.response?.status === 401) {
        alert("Session expired. Please log in again.");
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  const handleAddNote = async () => {
    if (!noteTitleInput.trim()) return alert("Note title required");
    try {
      await axios.post(
        `${API}/api/notes`,
        { title: noteTitleInput.trim() },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setNoteTitleInput("");
      fetchNotes();
    } catch (error) {
      console.error("Failed to create note", error);
    }
  };

  const handleDeleteNote = async (id: string) => {
    await axios.delete(`${API}/api/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    fetchNotes();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center px-2 py-4">
      {/* Top bar */}
      <div className="flex justify-between items-center w-full max-w-md px-1 mb-6">
        <div className="flex items-center gap-2">
          <img src={logo} alt="App logo" className="w-9 h-9 object-contain" />
          <span className="text-xl ml-8 font-semibold">Dashboard</span>
        </div>
        <button
          onClick={handleLogout}
          className="text-blue-600 text-sm underline hover:text-blue-800"
        >
          Sign Out
        </button>
      </div>

      {/* Welcome card */}
      <div className="w-full max-w-md rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.2)] p-5 bg-white mb-5">
        {user ? (
          <div className="mb-2">
            <span className="text-lg font-bold block mb-1">
              Welcome, <span className="font-black">{user.name}</span>!
            </span>
            <span className="text-gray-600 block text-sm">
              Email: {user.email}
            </span>
          </div>
        ) : (
          <div className="text-gray-500 text-sm">Loading user...</div>
        )}
      </div>

      {/* Create Note Section */}
      {!showInput ? (
        <button
          onClick={() => setShowInput(true)}
          className="w-full max-w-md bg-blue-600 text-white text-base rounded-xl font-semibold py-3 mb-5 shadow hover:bg-blue-700 transition md:mt-16"
        >
          Create Note
        </button>
      ) : (
        <div className="w-full max-w-md mb-5">
          <input
            type="text"
            placeholder="Enter note title..."
            className="w-full px-4 py-3 mb-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 md:mt-16"
            value={noteTitleInput}
            onChange={(e) => setNoteTitleInput(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                setNoteTitleInput("");
                setShowInput(false);
              }}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                await handleAddNote();
                setShowInput(false);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save Note
            </button>
          </div>
        </div>
      )}

      {/* Notes Section */}
      <div className="w-full max-w-md md:mt-4">
        <div className="font-semibold text-lg mb-2 pl-1">Notes</div>
        <div className="flex flex-col gap-3">
          {notes.length === 0 ? (
            <p className="text-gray-400 text-center py-7">
              No notes created yet.
            </p>
          ) : (
            notes.map((note) => (
              <div
                key={note._id}
                className="flex items-center justify-between px-4 py-3 bg-white rounded-lg shadow border"
              >
                <span className="font-medium text-base text-gray-900 truncate">
                  {note.title}
                </span>
                <button
                  className="text-gray-700 hover:text-red-500 p-1"
                  title="Delete"
                  onClick={() => handleDeleteNote(note._id)}
                >
                  <FaTrashAlt />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
