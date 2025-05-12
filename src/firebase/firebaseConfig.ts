import { initializeApp, FirebaseApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, Auth, onAuthStateChanged } from "firebase/auth"; // Added onAuthStateChanged

// Define the Firebase configuration interface
interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string; // Optional property
}

// Your web app's Firebase configuration
const firebaseConfig: FirebaseConfig = {
  apiKey: "AIzaSyAO2Z7CjbmJoBFILpbHy3zFzwS29jqBq_w",
  authDomain: "firstpick--login.firebaseapp.com",
  databaseURL: "https://firstpick--login-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "firstpick--login",
  storageBucket: "firstpick--login.firebasestorage.app",
  messagingSenderId: "968047516970",
  appId: "1:968047516970:web:e3b6eadb1fc17e35791253",
  measurementId: "G-M4EQHWR3PQ",
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const analytics: Analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
const auth: Auth = getAuth(app);

// Log current auth state and listen for changes
console.log("Current auth instance:", auth);
console.log("Current user:", auth.currentUser);

// Listen for auth state changes and log them
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in:", user);
    console.log("User UID:", user.uid);
    console.log("User email:", user.email);
    console.log("User display name:", user.displayName);
    console.log("User photo URL:", user.photoURL);
    console.log("User email verified:", user.emailVerified);
  } else {
    console.log("User is signed out");
  }
});

// ✅ Export everything you need
export { app, analytics, db, storage, auth };