// import React, { useState, useEffect } from "react";
// import {
//   getAuth,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   GoogleAuthProvider,
//   sendPasswordResetEmail,
// } from "firebase/auth";
// import { getFirestore, doc, getDoc } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
// import { app } from "../../firebase/firebaseConfig";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEnvelope, faLock, faCheckCircle, faTimes } from "@fortawesome/free-solid-svg-icons";

// const Login: React.FC = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [resetEmailSent, setResetEmailSent] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false);
//   const navigate = useNavigate();

//  // Auto-hide success message after 3 seconds
// useEffect(() => {
//   let timer: NodeJS.Timeout;
//   if (showSuccessPopup) {
//     timer = setTimeout(() => {
//       setShowSuccessPopup(false);
//       navigate("/");
//       window.location.reload(true);
//     }, 3000);
//   }
//   return () => clearTimeout(timer);
// }, [showSuccessPopup, navigate]);

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const auth = getAuth(app);
//     const db = getFirestore(app);

//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       const userDoc = await getDoc(doc(db, "users", user.uid));
//       if (userDoc.exists()) {
//         const userData = userDoc.data();
//         localStorage.setItem("user", JSON.stringify(userData));

//         // Show success message
//         setSuccessMessage(`Welcome back, ${userData.username}!`);
//         setShowSuccessPopup(true);
//       }
//     } catch (error: any) {
//       console.error("Error logging in:", error.message);
//       setError(`Login failed: ${error.message}`);
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     const auth = getAuth(app);
//     const provider = new GoogleAuthProvider();
//     const db = getFirestore(app);

//     try {
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;

//       const userDoc = await getDoc(doc(db, "users", user.uid));
//       if (userDoc.exists()) {
//         const userData = userDoc.data();
//         localStorage.setItem("user", JSON.stringify(userData));

//         // Show success message
//         setSuccessMessage(`Welcome back, ${userData.username}!`);
//         setShowSuccessPopup(true);
//       }
//     } catch (error: any) {
//       console.error("Error logging in with Google:", error.message);
//       setError(`Login failed: ${error.message}`);
//     }
//   };

//   const handleForgotPassword = async () => {
//     const auth = getAuth(app);

//     try {
//       await sendPasswordResetEmail(auth, email);
//       setResetEmailSent(true);
//       setSuccessMessage(`Password reset email sent to ${email}`);
//       setShowSuccessPopup(true);
//     } catch (error: any) {
//       console.error("Error sending reset email:", error.message);
//       setError(`Failed to send reset email: ${error.message}`);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6 pt-20">
//       {/* Success Popup */}
//       {showSuccessPopup && (
//         <div className="fixed top-4 right-4 z-50 bg-white rounded-lg shadow-lg max-w-md">
//           <div className="flex items-center p-4 border-l-4 border-teal-500">
//             <div className="flex-shrink-0">
//               <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-teal-500" />
//             </div>
//             <div className="ml-3">
//               <p className="text-sm font-medium text-gray-800">{successMessage}</p>
//             </div>
//             <div className="ml-auto pl-3">
//               <button
//                 onClick={() => setShowSuccessPopup(false)}
//                 className="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
//               >
//                 <FontAwesomeIcon icon={faTimes} className="h-4 w-4" />
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
//         {/* Left Panel */}
//         <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-10 flex flex-col justify-center items-center md:w-1/2">
//           <h1 className="text-4xl font-bold mb-4">Intern Connect</h1>
//           <p className="text-lg text-center mb-8">
//             Transform your workflow with our powerful platform. Join thousands of satisfied users today.
//           </p>
//           <div className="bg-white bg-opacity-10 p-6 rounded-lg">
//             <p className="italic mb-4">
//               "This platform has completely revolutionized how our team collaborates. The interface is
//               intuitive and the features are exactly what we needed."
//             </p>
//             <div className="flex items-center">
//               <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
//               <div>
//                 <p className="font-semibold">Sarah Johnson</p>
//                 <p className="text-sm">Product Manager</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Panel - Login Form */}
//         <div className="p-10 flex flex-col justify-center md:w-1/2">
//           <div className="text-center mb-8">
//             <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
//             <p className="text-gray-600">Log in to access your account</p>
//           </div>

//           <form onSubmit={handleLogin} className="space-y-6">
//             {error && <div className="text-red-500 text-center">{error}</div>}
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                 Email Address
//               </label>
//               <div className="mt-1 relative">
//                 <FontAwesomeIcon
//                   icon={faEnvelope}
//                   className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                 />
//                 <input
//                   type="email"
//                   id="email"
//                   className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
//                   placeholder="Your email address"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <div className="mt-1 relative">
//                 <FontAwesomeIcon
//                   icon={faLock}
//                   className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                 />
//                 <input
//                   type="password"
//                   id="password"
//                   className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
//                   placeholder="Your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </div>
//             </div>

//             <div className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   id="remember"
//                   className="h-4 w-4 text-teal-500 focus:ring-teal-500 border-gray-300 rounded"
//                 />
//                 <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
//                   Remember me
//                 </label>
//               </div>
//               <button
//                 type="button"
//                 className="text-sm text-teal-500 hover:text-teal-600"
//                 onClick={handleForgotPassword}
//               >
//                 Forgot password?
//               </button>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 transition duration-200"
//             >
//               Log In
//             </button>

//             <div className="flex items-center my-6">
//               <div className="flex-grow border-t border-gray-300"></div>
//               <span className="mx-4 text-gray-500">or continue with</span>
//               <div className="flex-grow border-t border-gray-300"></div>
//             </div>

//             <button
//               type="button"
//               className="w-full flex items-center justify-center bg-white border border-gray-300 rounded-md py-2 px-4 hover:bg-gray-50 transition duration-200"
//               onClick={handleGoogleSignIn}
//             >
//               <img
//                 src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/800px-Google_%22G%22_logo.svg.png"
//                 alt="Google logo"
//                 className="w-5 h-5 mr-2"
//               />
//               Google
//             </button>

//             <div className="text-center text-sm text-gray-600 mt-6">
//               Don't have an account?{" "}
//               <a href="/signup" className="text-teal-500 hover:text-teal-600">
//                 Sign up
//               </a>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;








import React, { useState, useEffect } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { app } from "../../firebase/firebaseConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faEnvelope, 
  faLock, 
  faCheckCircle, 
  faTimes 
} from "@fortawesome/free-solid-svg-icons";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Handle success message and navigation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (showSuccessPopup && isLoggedIn) {
      timer = setTimeout(() => {
        setShowSuccessPopup(false);
        navigate("/");
        
        // Only reload if absolutely necessary
        if (window.location.pathname === "/") {
          window.location.reload();
        }
      }, 2000); // Reduced to 2 seconds for better UX
    }
    
    return () => clearTimeout(timer);
  }, [showSuccessPopup, isLoggedIn, navigate]);

  const handleLoginSuccess = (userData: any) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setSuccessMessage(`Welcome back, ${userData.username}!`);
    setShowSuccessPopup(true);
    setIsLoggedIn(true);
    // Dispatch event to notify other components
    window.dispatchEvent(new Event("authStateChanged"));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const auth = getAuth(app);
    const db = getFirestore(app);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        handleLoginSuccess(userDoc.data());
      }
    } catch (error: any) {
      console.error("Error logging in:", error.message);
      setError(`Login failed: ${error.message}`);
    }
  };

  const handleGoogleSignIn = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const db = getFirestore(app);

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        handleLoginSuccess(userDoc.data());
      }
    } catch (error: any) {
      console.error("Error logging in with Google:", error.message);
      setError(`Login failed: ${error.message}`);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email address first");
      return;
    }

    const auth = getAuth(app);

    try {
      await sendPasswordResetEmail(auth, email);
      setResetEmailSent(true);
      setSuccessMessage(`Password reset email sent to ${email}`);
      setShowSuccessPopup(true);
    } catch (error: any) {
      console.error("Error sending reset email:", error.message);
      setError(`Failed to send reset email: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6 pt-20">
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed top-4 right-4 z-50 bg-white rounded-lg shadow-lg max-w-md animate-fade-in">
          <div className="flex items-center p-4 border-l-4 border-teal-500">
            <div className="flex-shrink-0">
              <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-teal-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-800">{successMessage}</p>
            </div>
            <div className="ml-auto pl-3">
              <button
                onClick={() => setShowSuccessPopup(false)}
                className="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <FontAwesomeIcon icon={faTimes} className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Left Panel */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-10 flex flex-col justify-center items-center md:w-1/2">
          <h1 className="text-4xl font-bold mb-4">Intern Connect</h1>
          <p className="text-lg text-center mb-8">
            Transform your workflow with our powerful platform. Join thousands of satisfied users today.
          </p>
          <div className="bg-white bg-opacity-10 p-6 rounded-lg">
            <p className="italic mb-4">
              "This platform has completely revolutionized how our team collaborates. The interface is
              intuitive and the features are exactly what we needed."
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
              <div>
                <p className="font-semibold">Sarah Johnson</p>
                <p className="text-sm">Product Manager</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="p-10 flex flex-col justify-center md:w-1/2">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
            <p className="text-gray-600">Log in to access your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="text-red-500 text-center p-2 bg-red-50 rounded">
                {error}
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="mt-1 relative">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  id="email"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <FontAwesomeIcon
                  icon={faLock}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="password"
                  id="password"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-teal-500 focus:ring-teal-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                  Remember me
                </label>
              </div>
              <button
                type="button"
                className="text-sm text-teal-500 hover:text-teal-600"
                onClick={handleForgotPassword}
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 transition duration-200"
            >
              Log In
            </button>

            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500">or continue with</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <button
              type="button"
              className="w-full flex items-center justify-center bg-white border border-gray-300 rounded-md py-2 px-4 hover:bg-gray-50 transition duration-200"
              onClick={handleGoogleSignIn}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/800px-Google_%22G%22_logo.svg.png"
                alt="Google logo"
                className="w-5 h-5 mr-2"
              />
              Google
            </button>

            <div className="text-center text-sm text-gray-600 mt-6">
              Don't have an account?{" "}
              <a href="/signup" className="text-teal-500 hover:text-teal-600">
                Sign up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

