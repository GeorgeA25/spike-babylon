import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import app from "./firebaseConfig";
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const loginWithGoogle = () => signInWithPopup(auth, provider);
export const logout = () => signOut(auth);
export const getCurrentUser = () => auth.currentUser;
export default auth;
