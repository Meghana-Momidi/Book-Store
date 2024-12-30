import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
  reload,
} from "firebase/auth";

const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};

const googleProvider = new GoogleAuthProvider();

// AuthProvider
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register a user
  const registerUser = async (username, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Update the user's profile with the username
      await updateProfile(userCredential.user, {
        displayName: username,
      });

      // Reload the user to reflect the updated profile
      await reload(userCredential.user);

      // Update the `currentUser` state manually
      setCurrentUser({
        ...userCredential.user,
        displayName: username, // Reflect the updated username
      });

      // Update the user in localStorage
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ email: userCredential.user.email, userName: username })
      );

      return userCredential;
    } catch (err) {
      throw err; // Throw error so that the component can catch it
    }
  };

  // Login user
  const loginUser = async (email, password) => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Store the user in localStorage
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ email: user.email, username: user.displayName })
      );

      // Update currentUser state
      setCurrentUser({
        email: user.email,
        username: user.displayName,
      });

      return userCredential;
    } catch (err) {
      throw err;
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    return await signInWithPopup(auth, googleProvider);
  };

  // Log out user
  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem("currentUser"); // Remove user from localStorage on logout
    localStorage.removeItem("theme");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    localStorage.removeItem("adminTokenExpiration");
  };

  // Manage user state
  useEffect(() => {
    // Check if there is a user in localStorage
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser)); // Load the user from localStorage
      setLoading(false);
    } else {
      // If no user in localStorage, listen to auth state changes
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          // Store the user in localStorage
          localStorage.setItem(
            "currentUser",
            JSON.stringify({ email: user.email, username: user.displayName })
          );
          setCurrentUser(user);
        } else {
          localStorage.removeItem("currentUser");
          setCurrentUser(null);
        }
        setLoading(false);
      });
      return () => unsubscribe();
    }
  }, []);

  const value = {
    currentUser,
    registerUser,
    loginUser,
    signInWithGoogle,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
