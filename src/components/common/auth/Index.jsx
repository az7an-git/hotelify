import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../../firebase/Firebase";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { NOTIFICATIONS, AUTH_ERRORS } from "../../../constants/notifications";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaBuilding, FaInfoCircle } from "react-icons/fa";
import logo from "../../../assets/common/magnum.png";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const toggleAuthMode = () => !loading && setIsLogin(!isLogin);

  const handleAuth = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
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
      const friendlyMessage = (error && error.code && AUTH_ERRORS[error.code]) || error.message || AUTH_ERRORS.DEFAULT;
      toast.error(friendlyMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleAutofillAdmin = () => {
    setEmail("hotelifyadmin@gmail.com");
    setPassword("Admin@123");
    toast.success("Admin credentials autofilled!");
  };

  return (
    <div className="auth-container p-4 max-w-5xl mx-auto my-8 lg:my-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden shadow-2xl border border-slate-100 bg-white">

        {/* Left Side: Visual Branding (Hidden/Modified on mobile, beautiful on desktop) */}
        <div
          className="lg:col-span-5 relative hidden lg:flex flex-col justify-between p-12 text-white bg-cover bg-center"
          style={{ backgroundImage: `url('/login_hotel_bg.png')` }}
        >
          {/* Dark overlay for solid text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/70 to-slate-900/60" />

          {/* Top Brand Info */}
          <div className="relative z-10 flex items-center gap-3.5">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center p-1 shadow-lg shadow-black/25">
              <img src={logo} alt="Magnum Logo" className="w-full h-full object-contain rounded-xl" />
            </div>
            <span className="text-2xl font-black tracking-wider text-white">MAGNUM HOTEL</span>
          </div>

          {/* Bottom Branding / Slogan */}
          <div className="relative z-10 space-y-4">
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white">
              Simplicity in <br />
              <span className="text-amber-400">Hospitality</span> Management.
            </h1>
            <p className="text-slate-100 text-sm leading-relaxed max-w-xs font-medium">
              Manage check-ins, room inventories, dining requests, and dynamic reporting in real-time.
            </p>
          </div>

          {/* Footer element inside left panel */}
          <div className="relative z-10 text-xs text-slate-300">
            &copy; 2026 Magnum Hotel Management System.
          </div>
        </div>

        {/* Right Side: Authentication Form */}
        <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col justify-center bg-slate-50/50">
          <div className="max-w-md w-full mx-auto space-y-6">

            {/* Form Header */}
            <div>
              {/* Logo icon only visible on mobile (since left pane is hidden) */}
              <div className="w-16 h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center p-1.5 shadow-md mb-4 lg:hidden">
                <img src={logo} alt="Magnum Logo" className="w-full h-full object-contain rounded-xl" />
              </div>
              <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                {isLogin ? "Sign in to access your hotel administration panel." : "Start setting up your hotel profile."}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleAuth} className="space-y-4">
              {/* Email input */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider block">Email Address</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                    <FaEnvelope />
                  </span>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.length <= 100) {
                        setEmail(value);
                      }
                    }}
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-150 disabled:opacity-50 text-slate-800 font-medium"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Password input */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider block">Password</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                    <FaLock />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.length <= 50) {
                        setPassword(value);
                      }
                    }}
                    className="w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-150 disabled:opacity-50 text-slate-800 font-medium"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-amber-600 hover:bg-amber-700 active:scale-[0.99] text-white font-semibold rounded-xl shadow-lg shadow-amber-500/25 transition-all duration-150 disabled:opacity-50 flex justify-center items-center"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    Processing...
                  </span>
                ) : (
                  isLogin ? "Login" : "Sign Up"
                )}
              </button>
            </form>

            {/* Toggle auth mode */}
            <div className="text-center">
              <button
                onClick={toggleAuthMode}
                disabled={loading}
                className="text-sm font-semibold text-amber-700 hover:text-amber-900 transition-colors disabled:opacity-50"
              >
                {isLogin ? "Create an account" : "Already have an account? Log in"}
              </button>
            </div>

            {/* Demo Credentials Alert Helper */}
            {isLogin && (
              <div
                onClick={handleAutofillAdmin}
                className="p-4 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm rounded-2xl cursor-pointer transition-all duration-150 flex items-start gap-3 group"
              >
                <div className="text-amber-600 mt-0.5 text-lg group-hover:scale-110 transition-transform">
                  <FaInfoCircle />
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Admin Login</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Click here to automatically fill credentials:</p>
                  <div className="text-xs text-slate-600 mt-1 font-mono">
                    <span className="font-semibold">Email:</span> hotelifyadmin@gmail.com<br />
                    <span className="font-semibold">Password:</span> Admin@123
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Auth;