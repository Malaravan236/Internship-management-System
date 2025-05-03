// import React, { useState, useEffect } from "react";
// import { getAuth, signOut } from "firebase/auth";
// import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
// import { app } from "../../firebase/firebaseConfig";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faUser,
//   faEnvelope,
//   faCalendarAlt,
//   faSignOutAlt,
//   faEdit,
//   faCheckCircle,
// } from "@fortawesome/free-solid-svg-icons";

// // Elegant Success Popup Component
// const SuccessPopup = ({ message, onClose, autoCloseDelay = 3000 }) => {
//   const [progress, setProgress] = useState(100);
  
//   useEffect(() => {
//     // Auto close after delay
//     const timer = setTimeout(() => {
//       onClose();
//     }, autoCloseDelay);
    
//     // Progress bar animation
//     const interval = setInterval(() => {
//       setProgress((prev) => {
//         const step = 100 / (autoCloseDelay / 100);
//         return Math.max(0, prev - step);
//       });
//     }, 100);
    
//     return () => {
//       clearTimeout(timer);
//       clearInterval(interval);
//     };
//   }, [autoCloseDelay, onClose]);
  
//   return (
//     <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center">
//       <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-2 px-4 rounded-lg shadow-lg flex items-center">
//         <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
//         <span>{message}</span>
//         <button
//           onClick={onClose}
//           className="ml-3 text-white hover:text-green-200 focus:outline-none"
//         >
//           ×
//         </button>
//       </div>
//       <div className="absolute bottom-0 left-0 h-1 bg-white rounded-b-lg transition-all duration-100 ease-linear" style={{ width: `${progress}%` }}></div>
//     </div>
//   );
// };

// const Profile = () => {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [editMode, setEditMode] = useState(false);
//   const [updatedUsername, setUpdatedUsername] = useState("");
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [refreshTrigger, setRefreshTrigger] = useState(0);

//   const navigate = useNavigate();

//   // Function to refresh the page data
//   const refreshPage = () => {
//     setRefreshTrigger(prev => prev + 1);
//   };

//   useEffect(() => {
//     const fetchUserData = async () => {
//       setLoading(true);
//       try {
//         const storedUser = localStorage.getItem("user");
//         if (storedUser) {
//           setUserData(JSON.parse(storedUser));
//           setLoading(false);
//           return;
//         }

//         const auth = getAuth(app);
//         const currentUser = auth.currentUser;

//         if (!currentUser) {
//           navigate("/login");
//           return;
//         }

//         const db = getFirestore(app);
//         const userDoc = await getDoc(doc(db, "users", currentUser.uid));

//         if (userDoc.exists()) {
//           const userData = userDoc.data();
//           const fullUserData = {
//             ...userData,
//             uid: currentUser.uid,
//             email: currentUser.email || userData.email || "",
//           };
//           setUserData(fullUserData);
//           localStorage.setItem("user", JSON.stringify(fullUserData));
//         } else {
//           setError("User profile not found");
//           setTimeout(() => navigate("/login"), 2000);
//         }
//       } catch (err) {
//         console.error("Error fetching user data:", err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, [navigate, refreshTrigger]); // Added refreshTrigger to dependency array

//   const handleLogout = async () => {
//     try {
//       const auth = getAuth(app);
//       await signOut(auth);
//       localStorage.removeItem("user");
//       navigate("/login");
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleUpdateProfile = async () => {
//     if (!userData) return;
//     try {
//       const db = getFirestore(app);
//       await updateDoc(doc(db, "users", userData.uid), {
//         username: updatedUsername || userData.username,
//       });

//       const updatedUserData = {
//         ...userData,
//         username: updatedUsername || userData.username,
//       };

//       setUserData(updatedUserData);
//       localStorage.setItem("user", JSON.stringify(updatedUserData));
//       setEditMode(false);
//       setSuccessMessage("Profile updated successfully!");
//       setShowSuccessPopup(true);
      
//       // Auto-refresh after successful update
//       setTimeout(() => {
//         refreshPage();
//       }, 3500); // Refresh after popup closes
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const formatDate = (seconds) => {
//     if (!seconds) return "N/A";
//     const date = new Date(seconds * 1000);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   if (loading) {
//     return (
//       <div className="h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="h-screen flex items-center justify-center">
//         <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
//           <p className="text-red-500 text-center mb-4">{error}</p>
//           <button
//             onClick={() => navigate("/login")}
//             className="bg-teal-500 hover:bg-teal-600 w-full py-2 rounded text-white"
//           >
//             Return to Login
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="mt-10 mr-2 bg-gray-100 relative">
//       {/* Success popup */}
//       {showSuccessPopup && (
//         <SuccessPopup
//           message={successMessage}
//           onClose={() => setShowSuccessPopup(false)}
//         />
//       )}

//       <div className="max-w-3xl mx-auto">
//         <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//           <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-6 flex items-center gap-6">
//             <div className="w-12 h-12 bg-white rounded-full overflow-hidden flex items-center justify-center">
//               {userData?.photoURL ? (
//                 <img
//                   src={userData.photoURL}
//                   alt="Profile"
//                   className="w-full h-full object-cover rounded-full"
//                 />
//               ) : (
//                 <FontAwesomeIcon icon={faUser} className="text-teal-500 text-3xl" />
//               )}
//             </div>
//             <div>
//               <h1 className="text-xl font-bold">{userData?.username || "User"}</h1>
//               <p className="text-sm text-white">{userData?.email}</p>
//             </div>
//           </div>

//           <div className="p-6">
//             <h2 className="text-lg font-semibold mb-4 text-gray-800">Profile Info</h2>

//             {editMode ? (
//               <>
//                 <input
//                   type="text"
//                   className="border px-3 py-2 rounded w-full mb-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
//                   value={updatedUsername || userData.username}
//                   onChange={(e) => setUpdatedUsername(e.target.value)}
//                 />
//                 <div className="flex gap-3">
//                   <button
//                     onClick={handleUpdateProfile}
//                     className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
//                   >
//                     Save
//                   </button>
//                   <button
//                     onClick={() => setEditMode(false)}
//                     className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <div className="space-y-4 text-sm text-gray-700">
//                 <div className="flex justify-between items-center border-b pb-2">
//                   <span className="flex items-center gap-2">
//                     <FontAwesomeIcon icon={faUser} /> Username:
//                   </span>
//                   <span className="font-medium">{userData?.username}</span>
//                 </div>
//                 <div className="flex justify-between items-center border-b pb-2">
//                   <span className="flex items-center gap-2">
//                     <FontAwesomeIcon icon={faEnvelope} /> Email:
//                   </span>
//                   <span className="font-medium">{userData?.email}</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="flex items-center gap-2">
//                     <FontAwesomeIcon icon={faCalendarAlt} /> Joined:
//                   </span>
//                   <span className="font-medium">
//                     {formatDate(userData?.createdAt?.seconds)}
//                   </span>
//                 </div>
//               </div>
//             )}

//             {!editMode && (
//               <button
//                 onClick={() => setEditMode(true)}
//                 className="mt-6 bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
//               >
//                 <FontAwesomeIcon icon={faEdit} className="mr-2" />
//                 Edit Profile
//               </button>
//             )}

//             <div className="mt-6 border-t pt-4">
//               <button
//                 onClick={handleLogout}
//                 className="text-red-500 hover:text-red-600 flex items-center gap-2"
//               >
//                 <FontAwesomeIcon icon={faSignOutAlt} />
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;











import React, { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { app } from "../../firebase/firebaseConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faCalendarAlt,
  faSignOutAlt,
  faEdit,
  faCheckCircle,
  faCog,
  faLock,
  faBook,
  faChartLine
} from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [updatedUsername, setUpdatedUsername] = useState("");
  const [activeTab, setActiveTab] = useState("profile");
  const [showSuccess, setShowSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const auth = getAuth(app);
        const currentUser = auth.currentUser;

        if (!currentUser) {
          navigate("/login");
          return;
        }

        const db = getFirestore(app);
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserData({
            ...userData,
            uid: currentUser.uid,
            email: currentUser.email || userData.email || "",
          });
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const auth = getAuth(app);
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const db = getFirestore(app);
      await updateDoc(doc(db, "users", userData.uid), {
        username: updatedUsername || userData.username,
      });

      setUserData({
        ...userData,
        username: updatedUsername || userData.username,
      });
      
      setEditMode(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const formatDate = (seconds) => {
    if (!seconds) return "N/A";
    const date = new Date(seconds * 1000);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success notification */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center animate-fade-in z-50">
          <FontAwesomeIcon icon={faCheckCircle} className="mr-3" />
          <span>Profile updated successfully!</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <div className="p-6 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
                    {userData?.photoURL ? (
                      <img
                        src={userData.photoURL}
                        alt="Profile"
                        className="h-full w-full rounded-full object-cover"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faUser}
                        className="text-white text-2xl"
                      />
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{userData?.username}</h2>
                    <p className="text-emerald-100 text-sm">{userData?.email}</p>
                  </div>
                </div>
              </div>

              <nav className="p-4">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full text-left px-4 py-3 rounded-lg mb-2 flex items-center transition-colors ${activeTab === "profile" ? "bg-emerald-50 text-emerald-700 font-medium" : "text-gray-600 hover:bg-gray-50"}`}
                >
                  <FontAwesomeIcon icon={faUser} className="mr-3 w-5 text-center" />
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab("courses")}
                  className={`w-full text-left px-4 py-3 rounded-lg mb-2 flex items-center transition-colors ${activeTab === "courses" ? "bg-emerald-50 text-emerald-700 font-medium" : "text-gray-600 hover:bg-gray-50"}`}
                >
                  <FontAwesomeIcon icon={faBook} className="mr-3 w-5 text-center" />
                  My Courses
                </button>
                <button
                  onClick={() => setActiveTab("progress")}
                  className={`w-full text-left px-4 py-3 rounded-lg mb-2 flex items-center transition-colors ${activeTab === "progress" ? "bg-emerald-50 text-emerald-700 font-medium" : "text-gray-600 hover:bg-gray-50"}`}
                >
                  <FontAwesomeIcon icon={faChartLine} className="mr-3 w-5 text-center" />
                  Progress
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`w-full text-left px-4 py-3 rounded-lg mb-2 flex items-center transition-colors ${activeTab === "settings" ? "bg-emerald-50 text-emerald-700 font-medium" : "text-gray-600 hover:bg-gray-50"}`}
                >
                  <FontAwesomeIcon icon={faCog} className="mr-3 w-5 text-center" />
                  Settings
                </button>
                <button
                  onClick={() => setActiveTab("security")}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-colors ${activeTab === "security" ? "bg-emerald-50 text-emerald-700 font-medium" : "text-gray-600 hover:bg-gray-50"}`}
                >
                  <FontAwesomeIcon icon={faLock} className="mr-3 w-5 text-center" />
                  Security
                </button>
              </nav>

              <div className="p-4 border-t">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 flex items-center transition-colors"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-3 w-5 text-center" />
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "profile" && (
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
                    {!editMode && (
                      <button
                        onClick={() => setEditMode(true)}
                        className="flex items-center text-emerald-600 hover:text-emerald-800 transition-colors"
                      >
                        <FontAwesomeIcon icon={faEdit} className="mr-2" />
                        Edit Profile
                      </button>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  {editMode ? (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Username
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                          value={updatedUsername || userData.username}
                          onChange={(e) => setUpdatedUsername(e.target.value)}
                        />
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={handleUpdateProfile}
                          className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
                        >
                          Save Changes
                        </button>
                        <button
                          onClick={() => setEditMode(false)}
                          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
                          <div className="text-sm text-gray-500 mb-2">Username</div>
                          <div className="font-medium text-gray-800">{userData?.username}</div>
                        </div>
                        <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
                          <div className="text-sm text-gray-500 mb-2">Email</div>
                          <div className="font-medium text-gray-800">{userData?.email}</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
                          <div className="text-sm text-gray-500 mb-2">Member Since</div>
                          <div className="font-medium text-gray-800">
                            {formatDate(userData?.createdAt?.seconds)}
                          </div>
                        </div>
                        <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
                          <div className="text-sm text-gray-500 mb-2">Account Status</div>
                          <div className="font-medium text-emerald-600 flex items-center">
                            <span className="h-2 w-2 bg-emerald-500 rounded-full mr-2"></span>
                            Active
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "courses" && (
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-800">My Courses</h2>
                </div>
                <div className="p-6">
                  <div className="text-center py-16">
                    <div className="inline-flex items-center justify-center h-16 w-16 bg-emerald-100 rounded-full mb-5">
                      <FontAwesomeIcon icon={faBook} className="text-emerald-600 text-xl" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-700 mb-1">No courses enrolled yet</h3>
                    <p className="text-gray-500 mb-6">Explore our courses to get started</p>
                    <button className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                      Browse Courses
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "progress" && (
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-800">Learning Progress</h2>
                </div>
                <div className="p-6">
                  <div className="text-center py-16">
                    <div className="inline-flex items-center justify-center h-16 w-16 bg-emerald-100 rounded-full mb-5">
                      <FontAwesomeIcon icon={faChartLine} className="text-emerald-600 text-xl" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-700 mb-1">No progress data available</h3>
                    <p className="text-gray-500">Start learning to track your progress</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-800">Account Settings</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                      <h3 className="text-lg font-medium mb-5 text-gray-800">Notification Preferences</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-800">Email Notifications</div>
                            <div className="text-sm text-gray-500">Receive updates via email</div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-emerald-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-800">Push Notifications</div>
                            <div className="text-sm text-gray-500">Get alerts on your device</div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-emerald-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-800">Security Settings</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                      <h3 className="text-lg font-medium mb-5 text-gray-800">Change Password</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Current Password
                          </label>
                          <input
                            type="password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                            placeholder="Enter current password"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            New Password
                          </label>
                          <input
                            type="password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                            placeholder="Enter new password"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                            placeholder="Confirm new password"
                          />
                        </div>
                        <button className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                          Update Password
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;