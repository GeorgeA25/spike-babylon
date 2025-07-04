// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";
// import BabylonScene from "./BabylonScene";

// function App() {
//   return (
//     <div>
//       <BabylonScene />
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState } from "react";
import { loginWithGoogle, logout, getCurrentUser } from "../firebaseAuth";
// import { firebaseConfig } from "./firebaseConfig"

const App = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const user = getCurrentUser();
    setUser(user);
  }, []);
  const handleLogin = async () => {
    try {
      const result = await loginWithGoogle();
      setUser(result.user);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  const handleLogout = async () => {
    await logout();
    setUser(null);
  };
  return (
    <div>
      {user ? (
        <>
          <h2>Welcome, {user.displayName}</h2>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <button onClick={handleLogin}>Login with Google</button>
      )}
    </div>
  );
};
export default App;
