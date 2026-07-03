import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../../firebase/Firebase";
import { useNavigate } from "react-router";

import { toast } from "sonner";
import { NOTIFICATIONS } from "../../../constants/notifications";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const toggleAuthMode = () => !loading && setIsLogin(!isLogin);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success(NOTIFICATIONS.AUTH_LOGIN_SUCCESS);
        navigate("/");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success(NOTIFICATIONS.AUTH_SIGNUP_SUCCESS);
        navigate("/");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container p-6 max-w-md mx-auto">
      <h2 className="text-center text-2xl mb-4">
        {isLogin ? "Login" : "Sign Up"}
      </h2>
      <form className="shadow-lg p-2 lg:p-4" onSubmit={handleAuth}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            const value = e.target.value;
            if (value.length <= 20) {
              setEmail(e.target.value);
            }
          }}
          className="w-full p-2 mb-3 border rounded focus:outline-yellow-600 disabled:opacity-50"
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            const value = e.target.value;
            if (value.length <= 10) {
              setPassword(e.target.value);
            }
          }}
          className="w-full p-2 mb-3 border rounded focus:outline-yellow-600 disabled:opacity-50"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full p-2 bg-blue-600 hover:bg-blue-800 transition-all duration-150 text-slate-800 rounded disabled:opacity-50"
        >
          {loading ? "Processing..." : (isLogin ? "Login" : "Sign Up")}
        </button>
      </form>
      <button onClick={toggleAuthMode} disabled={loading} className="mt-4 underline text-blue-600 disabled:opacity-50">
        {isLogin ? "Create an account" : "Already have an account? Log in"}
      </button>
      <div className="flex flex-col text-md mt-3 justify-center font-semibold">
        <p className="text-center">Admin Credentials</p>
        <p>Email: hfahad@live.com</p>
        <p>Password: hassan</p>
      </div>
    </div>
  );
};

export default Auth;