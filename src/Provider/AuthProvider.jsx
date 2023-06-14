import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../firebase/firebase.init";
import axios from "axios";

const AuthProvider = ({ children }) => {
  const auth = getAuth(app);

  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const [modalId, setModalId] = useState();
  const [user, setUser] = useState();
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log("state changed to " + currentUser);
      // console.log(currentUser);
      // TODO: use axios
      if (currentUser?.email) {
        axios
          .post("/jwt", {
            // Request body data
            email: currentUser.email,
          })
          .then((response) => {
            console.log("resdata", response.data); // Handle the response data
            // Additional code to handle the response as needed
            localStorage.setItem("access_token", response.data);
          })
          .catch((error) => {
            console.error(error); // Handle the error
          });
      } else localStorage.removeItem("access_token");
      setUser(currentUser);
      if (!currentUser) localStorage.removeItem("toy-token");
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const [role, setRole] = useState("");

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`/users/${user?.email}`)
        .then((res) => {
          console.log(res);
          setRole(res.data.role);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [user]);

  const [isNight, setIsNight] = useState(false);
  console.log(user, "role", role);

  const info = {
    user,
    createUser,
    signInUser,
    auth,
    setUser,
    setLoading,
    loading,
    isOpen,
    setIsOpen,
    setModalId,
    modalId,
    role,
    isNight,
    setIsNight,
  };
  return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
