// src/components/AuthForm.jsx
import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../src/firebaseAuth";
const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Account created!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Logged in!");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">{isRegistering ? "Register" : "Login"}</button>
      <p
        onClick={() => setIsRegistering(!isRegistering)}
        style={{ cursor: "pointer", color: "blue" }}
      >
        {isRegistering
          ? "Already have an account? Log in"
          : "New user? Register here"}
      </p>
    </form>
  );
};

export default AuthForm;
