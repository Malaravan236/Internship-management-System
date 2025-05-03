// import React, { useState, useEffect } from "react";
// import { Pencil, Trash2, Send } from "lucide-react";
// import { db } from "../../firebase/firebaseConfig"; // Adjust the path as needed
// import {
//   collection,
//   addDoc,
//   updateDoc,
//   deleteDoc,
//   doc,
//   onSnapshot,
//   query,
//   orderBy,
// } from "firebase/firestore";

// interface Notification {
//   id: string;
//   title: string;
//   message: string;
// }

// const NotificationManager: React.FC = () => {
//   const [notifications, setNotifications] = useState<Notification[]>([]);
//   const [title, setTitle] = useState("");
//   const [message, setMessage] = useState("");
//   const [editId, setEditId] = useState<string | null>(null);

//   // Reference to the notifications collection in Firestore
//   const notificationsCollection = collection(db, "notifications");

//   // Listen for real-time updates
//   useEffect(() => {
//     // Optional: Order by created time descending if you store timestamps
//     const q = query(notificationsCollection, orderBy("createdAt", "desc"));

//     const unsubscribe = onSnapshot(
//       q,
//       (snapshot) => {
//         const notificationsData: Notification[] = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           title: doc.data().title,
//           message: doc.data().message,
//         }));
//         setNotifications(notificationsData);
//       },
//       (error) => {
//         console.error("Error fetching notifications: ", error);
//       }
//     );

//     // Clean up the subscription on unmount
//     return () => unsubscribe();
//   }, []);

//   // Handle sending (creating or updating) a notification
//   const handleSend = async () => {
//     if (!title || !message) return;

//     if (editId) {
//       // Update the existing notification
//       try {
//         const notificationRef = doc(db, "notifications", editId);
//         await updateDoc(notificationRef, { title, message });
//         // Reset the editing state
//         setEditId(null);
//       } catch (error) {
//         console.error("Error updating notification: ", error);
//       }
//     } else {
//       // Add a new notification
//       try {
//         await addDoc(notificationsCollection, {
//           title,
//           message,
//           // Optionally, add a createdAt field. Firestore supports timestamps:
//           createdAt: new Date(),
//         });
//       } catch (error) {
//         console.error("Error adding notification: ", error);
//       }
//     }
//     setTitle("");
//     setMessage("");
//   };

//   // Populate the form with the selected notification's data for editing
//   const handleEdit = (notif: Notification) => {
//     setEditId(notif.id);
//     setTitle(notif.title);
//     setMessage(notif.message);
//   };

//   // Delete a notification
//   const handleDelete = async (id: string) => {
//     try {
//       await deleteDoc(doc(db, "notifications", id));
//     } catch (error) {
//       console.error("Error deleting notification: ", error);
//     }
//   };

//   return (
//     // Added pt-40 to create padding-top, avoiding overlap with a fixed navbar; adjust as needed
//     <div className="max-w-2xl mx-auto p-4 pt-40 mb-20 bg-gray-100 rounded shadow">
//       <h2 className="text-2xl font-bold mb-4 text-center">
//         Admin Notification Panel
//       </h2>

//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Notification Title"
//           className="w-full p-2 border mb-2 rounded"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <textarea
//           placeholder="Notification Message"
//           className="w-full p-2 border mb-2 rounded"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button
//           onClick={handleSend}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
//         >
//           <Send size={16} />
//           {editId ? "Update Notification" : "Send Notification"}
//         </button>
//       </div>

//       <div className="space-y-4">
//         {notifications.map((notif) => (
//           <div
//             key={notif.id}
//             className="border p-4 rounded shadow flex justify-between items-center"
//           >
//             <div>
//               <h3 className="font-bold text-lg">{notif.title}</h3>
//               <p>{notif.message}</p>
//             </div>
//             <div className="flex gap-2">
//               <button
//                 className="text-green-600 hover:text-green-800"
//                 onClick={() => handleEdit(notif)}
//               >
//                 <Pencil size={18} />
//               </button>
//               <button
//                 className="text-red-600 hover:text-red-800"
//                 onClick={() => handleDelete(notif.id)}
//               >
//                 <Trash2 size={18} />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default NotificationManager;













import React, { useState, useEffect, useRef } from "react";
import { Pencil, Trash2, Send, Users, User } from "lucide-react";
import { db } from "../../firebase/firebaseConfig";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  where,
  getDocs,
} from "firebase/firestore";

interface Notification {
  id: string;
  title: string;
  message: string;
  targetType: "all" | "specific";
  targetUsers?: string[];
  createdAt: Date;
}

interface UserOption {
  id: string;
  name: string;
}

const NotificationManager: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [targetType, setTargetType] = useState<"all" | "specific">("all");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userOptions, setUserOptions] = useState<UserOption[]>([]);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  
  // Ref for dropdown container to handle outside clicks
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Reference to the notifications collection in Firestore
  const notificationsCollection = collection(db, "notifications");
  const usersCollection = collection(db, "users");

  // Load users for selection
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const snapshot = await getDocs(usersCollection);
        const users: UserOption[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name || doc.data().email || doc.id,
        }));
        setUserOptions(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Listen for real-time updates on notifications
  useEffect(() => {
    const q = query(notificationsCollection, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const notificationsData: Notification[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          message: doc.data().message,
          targetType: doc.data().targetType || "all",
          targetUsers: doc.data().targetUsers || [],
          createdAt: doc.data().createdAt?.toDate() || new Date(),
        }));
        setNotifications(notificationsData);
      },
      (error) => {
        console.error("Error fetching notifications: ", error);
      }
    );

    return () => unsubscribe();
  }, []);

  // Handle outside clicks to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter users based on search term
  const filteredUsers = userOptions.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Toggle user selection
  const toggleUserSelection = (userId: string) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
    // Don't close dropdown to allow multiple selections
  };

  // Handle sending (creating or updating) a notification
  const handleSend = async () => {
    if (!title || !message) {
      alert("Please provide both title and message");
      return;
    }

    if (targetType === "specific" && selectedUsers.length === 0) {
      alert("Please select at least one user for specific notification");
      return;
    }

    const notificationData = {
      title,
      message,
      targetType,
      targetUsers: targetType === "specific" ? selectedUsers : [],
      createdAt: new Date(),
    };

    try {
      if (editId) {
        // Update existing notification
        const notificationRef = doc(db, "notifications", editId);
        await updateDoc(notificationRef, notificationData);
        setEditId(null);
      } else {
        // Add new notification
        await addDoc(notificationsCollection, notificationData);
      }
      
      // Reset form
      setTitle("");
      setMessage("");
      setTargetType("all");
      setSelectedUsers([]);
      setSearchTerm("");
      setShowUserDropdown(false);
    } catch (error) {
      console.error("Error with notification:", error);
      alert("Failed to send notification");
    }
  };

  // Populate the form with the selected notification's data for editing
  const handleEdit = (notif: Notification) => {
    setEditId(notif.id);
    setTitle(notif.title);
    setMessage(notif.message);
    setTargetType(notif.targetType);
    setSelectedUsers(notif.targetUsers || []);
  };

  // Delete a notification
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this notification?")) {
      try {
        await deleteDoc(doc(db, "notifications", id));
      } catch (error) {
        console.error("Error deleting notification:", error);
        alert("Failed to delete notification");
      }
    }
  };

  // Get user names for display
  const getUserNames = (userIds: string[]) => {
    return userIds
      .map((id) => {
        const user = userOptions.find((u) => u.id === id);
        return user ? user.name : id;
      })
      .join(", ");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 pt-40 mb-20 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Admin Notification Panel
      </h2>

      <div className="mb-6 bg-white p-4 rounded-md shadow">
        <h3 className="font-semibold text-lg mb-4">
          {editId ? "Edit Notification" : "Create New Notification"}
        </h3>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Title</label>
          <input
            type="text"
            placeholder="Notification Title"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Message</label>
          <textarea
            placeholder="Notification Message"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-24"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Target Audience</label>
          <div className="flex gap-4 mb-3">
            <label className="flex items-center">
              <input
                type="radio"
                name="targetType"
                className="mr-2"
                checked={targetType === "all"}
                onChange={() => {
                  setTargetType("all");
                  setShowUserDropdown(false);
                }}
              />
              <span className="flex items-center">
                <Users size={16} className="mr-1" /> All Users
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="targetType"
                className="mr-2"
                checked={targetType === "specific"}
                onChange={() => setTargetType("specific")}
              />
              <span className="flex items-center">
                <User size={16} className="mr-1" /> Specific Users
              </span>
            </label>
          </div>

          {targetType === "specific" && (
            <div className="mb-2 relative" ref={dropdownRef}>
              <div
                className="border border-gray-300 rounded p-2 cursor-text"
                onClick={() => setShowUserDropdown(true)}
              >
                {selectedUsers.length > 0 ? (
                  <div className="flex flex-wrap gap-1 mb-1">
                    {selectedUsers.map((userId) => {
                      const user = userOptions.find((u) => u.id === userId);
                      return (
                        <span
                          key={userId}
                          className="bg-blue-100 text-blue-800 text-sm rounded-full px-2 py-1 flex items-center"
                        >
                          {user?.name || userId}
                          <button
                            className="ml-1 text-blue-600 hover:text-blue-800"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleUserSelection(userId);
                            }}
                          >
                            ×
                          </button>
                        </span>
                      );
                    })}
                  </div>
                ) : (
                  <span className="text-gray-500">Select users...</span>
                )}
                <input
                  type="text"
                  className="mt-1 w-full focus:outline-none"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setShowUserDropdown(true)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              {showUserDropdown && (
                <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-64 overflow-y-auto">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <div
                        key={user.id}
                        className={`p-2 cursor-pointer ${
                          selectedUsers.includes(user.id)
                            ? "bg-blue-50"
                            : "hover:bg-gray-100"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleUserSelection(user.id);
                        }}
                      >
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(user.id)}
                            onChange={() => {}}
                            className="mr-2"
                          />
                          {user.name}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-2 text-gray-500">No users found</div>
                  )}
                  <div className="p-2 border-t border-gray-200">
                    <button 
                      className="w-full bg-gray-100 text-gray-700 py-1 rounded hover:bg-gray-200"
                      onClick={() => setShowUserDropdown(false)}
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => {
              setEditId(null);
              setTitle("");
              setMessage("");
              setTargetType("all");
              setSelectedUsers([]);
              setShowUserDropdown(false);
            }}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            className={`px-4 py-2 rounded flex items-center gap-2 ${
              !title || !message || (targetType === "specific" && selectedUsers.length === 0)
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
            disabled={!title || !message || (targetType === "specific" && selectedUsers.length === 0)}
          >
            <Send size={16} />
            {editId ? "Update Notification" : "Send Notification"}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-lg mb-2">Notification History</h3>
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <div
              key={notif.id}
              className="border p-4 rounded shadow bg-white"
            >
              <div className="flex justify-between mb-2">
                <h3 className="font-bold text-lg">{notif.title}</h3>
                <div className="flex gap-2">
                  <button
                    className="text-green-600 hover:text-green-800 p-1"
                    onClick={() => handleEdit(notif)}
                    title="Edit"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800 p-1"
                    onClick={() => handleDelete(notif.id)}
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <p className="mb-2">{notif.message}</p>
              <div className="text-sm text-gray-600 flex items-center gap-2">
                <span className="flex items-center">
                  {notif.targetType === "all" ? (
                    <>
                      <Users size={14} className="mr-1" /> All Users
                    </>
                  ) : (
                    <>
                      <User size={14} className="mr-1" /> 
                      {notif.targetUsers && notif.targetUsers.length > 0
                        ? `${notif.targetUsers.length} specific users`
                        : "No users specified"}
                    </>
                  )}
                </span>
                <span>•</span>
                <span>
                  {notif.createdAt.toLocaleDateString()} {notif.createdAt.toLocaleTimeString()}
                </span>
              </div>
              
              {notif.targetType === "specific" && notif.targetUsers && notif.targetUsers.length > 0 && (
                <div className="mt-2 text-sm text-gray-600">
                  <span className="font-medium">Recipients:</span> {getUserNames(notif.targetUsers)}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-4">
            No notifications yet. Create your first notification above.
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationManager;