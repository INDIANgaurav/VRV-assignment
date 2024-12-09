import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GrUpdate } from "react-icons/gr";
import toast, {Toaster} from "react-hot-toast"
const Dashboard = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // To track the user being edited
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "buyer",
  });

  const navigate = useNavigate();

  const handleCheckboxChange = async (userId, currentStatus) => {
    try {
      const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/users/updatestatus/${userId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAllUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, status: newStatus } : user
        )
      );
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const getAllUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/users/getallusers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAllUsers(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        console.error("Failed to fetch users:", error);
      }
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/users/updaterole/${userId}`,
        { role: newRole },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAllUsers((prevUsers) =>
        prevUsers.map((user) =>
          user?._id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (error) {
      console.log("failed to update the role", error);
    }
  };

  const handleAddUser = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/users/adduser", newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAllUsers((prevUsers) => [...prevUsers, newUser]);
      setNewUser({ username: "", email: "", password: "", role: "buyer" });
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to add user:", error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/users/updateuser/${currentUser._id}`,
        currentUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAllUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === currentUser._id ? currentUser : user
        )
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const openUpdateModal = (user) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    
    <div className="w-[80%] left-0 right-0 mx-auto p-2">
      <div>
        
        <Toaster/>
      </div>
      <div className="border rounded-xl text-white bg-zinc-800 min-h-screen flex flex-col items-center gap-10">
        <div className="flex flex-col">
          <h1 className="mt-10 text-center">All Registered Users :-</h1>
          <div className="w-[100%] h-0.5 bg-white"></div>
        </div>
        <div className="bg-white text-black w-[60%] h-[70%] rounded-lg">
          {allUsers.length > 0 ? (
            allUsers.map((item, id) => (
              <div
                key={id}
                className="border-2 flex p-4 rounded-xl bg-gray-100"
              >
                <div>
                  <h3>Name: {item?.username}</h3>
                  <p>Email: {item?.email}</p>
                  <label>
                    Role:
                    <select
                      value={item?.role}
                      onChange={(e) =>
                        handleRoleChange(item?._id, e.target.value)
                      }
                      className="ml-2 border rounded p-1"
                    >
                      <option value="admin">Admin</option>
                      <option value="buyer">Buyer</option>
                      <option value="editor">Editor</option>
                    </select>
                  </label>

                  <label className="inline-flex items-center cursor-pointer gap-3">
                    Status: {item?.status}
                    <input
                      type="checkbox"
                      checked={item?.status === "Active"}
                      onChange={() =>
                        handleCheckboxChange(item?._id, item?.status)
                      }
                      className="sr-only peer"
                    />
                    <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:bg-green-600"></div>
                  </label>
                </div>
                <div>
                  <button>
                    <GrUpdate onClick={() => openUpdateModal(item)} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Loading users....</p>
          )}
        </div>
        <div>
          <button
            className="border rounded-lg px-2"
            onClick={() => setIsModalOpen(true)}
          >
            Add User
          </button>
        </div>
      </div>

      {/* Modal for Adding/Updating User */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              ✕
            </button>
            <h2 className="text-lg font-bold mb-4">
              {currentUser ? "Update User" : "Add New User"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  value={currentUser?.username || newUser.username}
                  onChange={(e) =>
                    currentUser
                      ? setCurrentUser({
                          ...currentUser,
                          username: e.target.value,
                        })
                      : setNewUser({ ...newUser, username: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Enter username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={currentUser?.email || newUser.email}
                  onChange={(e) =>
                    currentUser
                      ? setCurrentUser({
                          ...currentUser,
                          email: e.target.value,
                        })
                      : setNewUser({ ...newUser, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Enter email"
                />
              </div>
              {!currentUser && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    value={newUser.password}
                    onChange={(e) =>
                      setNewUser({ ...newUser, password: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter password"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  value={currentUser?.role || newUser.role}
                  onChange={(e) =>
                    currentUser
                      ? setCurrentUser({ ...currentUser, role: e.target.value })
                      : setNewUser({ ...newUser, role: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="admin">Admin</option>
                  <option value="buyer">Buyer</option>
                  <option value="editor">Editor</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-md mr-2"
              >
                Close
              </button>
              <button
                onClick={currentUser ? handleUpdateUser : handleAddUser}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
