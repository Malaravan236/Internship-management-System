import React, { useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import { getFirestore, doc, setDoc, collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { app } from "../../firebase/firebaseConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faEnvelope, 
  faLock, 
  faUser, 
  faCheckCircle, 
  faTimes 
} from "@fortawesome/free-solid-svg-icons";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const navigate = useNavigate();

  // Auto-hide success message after 3 seconds
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showSuccessPopup) {
      timer = setTimeout(() => {
        setShowSuccessPopup(false);
        navigate("/");
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [showSuccessPopup, navigate]);

  // Check if email exists in manualUsers collection
  const checkEmailExistsInManualUsers = async (email: string) => {
    const db = getFirestore(app);
    const manualUsersRef = collection(db, "manualUsers");
    const q = query(manualUsersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate password match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Validate password strength (at least 6 characters)
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    const db = getFirestore(app);

    try {
      // Check if email already exists in manualUsers collection only
      const emailExists = await checkEmailExistsInManualUsers(email);
      if (emailExists) {
        setError("This email is already registered. Please use a different email or log in.");
        return;
      }

      const auth = getAuth(app);
      
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Update user profile with username
      await updateProfile(user, {
        displayName: username
      });

      // Store manual user data in the "manualUsers" collection
      const userData = {
        uid: user.uid,
        email: user.email,
        username: username,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        authType: "manual" // Adding auth type for clarity
      };

      // Store in the manualUsers collection
      await setDoc(doc(db, "manualUsers", user.uid), userData);
      
      // Also store in the general users collection for compatibility
      await setDoc(doc(db, "users", user.uid), {
        ...userData,
        authType: "manual"
      });
      
      // Store user info in localStorage
      localStorage.setItem("user", JSON.stringify({
        ...userData,
        authType: "manual"
      }));
      
      // Show success message
      setSuccessMessage(`Account created successfully! Welcome, ${username}!`);
      setShowSuccessPopup(true);
    } catch (error: any) {
      console.error("Error signing up:", error.message);
      
      // Provide a more user-friendly error message for Firebase auth errors
      if (error.code === 'auth/email-already-in-use') {
        setError("This email is already in use. If you signed up with Google previously, please use Google sign-in.");
      } else {
        setError(`Signup failed: ${error.message}`);
      }
    }
  };

  const handleGoogleSignup = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const db = getFirestore(app);

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Check if this is a new user
      const isNewUser = result.additionalUserInfo?.isNewUser;
      
      // Store Google user data in the "googleUsers" collection
      const userData = {
        uid: user.uid,
        email: user.email,
        username: user.displayName || `User_${user.uid.substring(0, 5)}`,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        profilePicture: user.photoURL,
        authType: "google" // Adding auth type for clarity
      };

      // Store in the googleUsers collection
      await setDoc(doc(db, "googleUsers", user.uid), userData, { merge: true });
      
      // Also store in the general users collection for compatibility
      await setDoc(doc(db, "users", user.uid), {
        ...userData,
        authType: "google"
      }, { merge: true });
      
      // Store user info in localStorage
      localStorage.setItem("user", JSON.stringify({
        ...userData,
        authType: "google"
      }));
      
      // Show success message
      if (isNewUser) {
        setSuccessMessage(`Account created successfully! Welcome, ${userData.username}!`);
      } else {
        setSuccessMessage(`Welcome back, ${userData.username}!`);
      }
      setShowSuccessPopup(true);
    } catch (error: any) {
      console.error("Error signing up with Google:", error.message);
      setError(`Signup failed: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6 pt-20">
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed top-4 right-4 z-50 bg-white rounded-lg shadow-lg max-w-md">
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
            Join our community of professionals and unlock your career potential.
          </p>
          <div className="bg-white bg-opacity-10 p-6 rounded-lg">
            <p className="italic mb-4">
              "Signing up was the best career decision I made this year. The networking opportunities and resources are invaluable."
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
              <div>
                <p className="font-semibold">Michael Chen</p>
                <p className="text-sm">Software Developer</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Signup Form */}
        <div className="p-10 flex flex-col justify-center md:w-1/2">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
            <p className="text-gray-600">Join Intern Connect today</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            {error && <div className="text-red-500 text-center">{error}</div>}
            
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1 relative">
                <FontAwesomeIcon
                  icon={faUser}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  id="username"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Choose a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

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
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">Password must be at least 6 characters</p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1 relative">
                <FontAwesomeIcon
                  icon={faLock}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="password"
                  id="confirmPassword"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                className="h-4 w-4 text-teal-500 focus:ring-teal-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                I agree to the{" "}
                <a href="/terms" className="text-teal-500 hover:text-teal-600">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-teal-500 hover:text-teal-600">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 transition duration-200"
            >
              Create Account
            </button>

            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500">or continue with</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <button
              type="button"
              className="w-full flex items-center justify-center bg-white border border-gray-300 rounded-md py-2 px-4 hover:bg-gray-50 transition duration-200"
              onClick={handleGoogleSignup}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/800px-Google_%22G%22_logo.svg.png"
                alt="Google logo"
                className="w-5 h-5 mr-2"
              />
              Google
            </button>

            <div className="text-center text-sm text-gray-600 mt-6">
              Already have an account?{" "}
              <a href="/login" className="text-teal-500 hover:text-teal-600">
                Log in
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;