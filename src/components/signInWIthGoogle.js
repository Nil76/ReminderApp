import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "./firebase";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";
import googleIcon from "../google.png"; // Use ES6 import for the image

function SignInwithGoogle() {
  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: user.displayName,
          photo: user.photoURL,
        });
        toast.success("User logged in successfully!", {
          position: "top-center",
        });

        window.location.href = "/profile"; // Avoid using in React; use a router instead
      }
    } catch (error) {
      console.error("Error during Google login:", error);
      toast.error("Failed to log in. Please try again.", {
        position: "top-center",
      });
    }
  };

  return (
    <div>
      <p className="continue-p">--Or continue with--</p>
      <div
        style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
        onClick={googleLogin}
      >
        <img src={googleIcon} alt="Google Icon" width={"30%"} />
      </div>
    </div>
  );
}

export default SignInwithGoogle;
