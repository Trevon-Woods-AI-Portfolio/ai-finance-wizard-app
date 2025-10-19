import React, { useEffect, useState } from "react";
import Threads from "../utils/Threads";
import Avatar from "@mui/material/Avatar";
import Navbar from "../components/Navbar";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../state/state";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      // Cleanup function
      const canvas = document.querySelector('canvas');
      if (canvas) {
        const gl = canvas.getContext('webgl') || canvas.getContext('webgl2');
        if (gl) {
          const loseContext = gl.getExtension('WEBGL_lose_context');
          if (loseContext) {
            loseContext.loseContext();
          }
        }
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setError("");

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      setLoading(true);

      const res = await fetch("/api/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
        setLoading(false);
        return;
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    } finally {
      dispatch(setLogin({ user: data.user }));
      setLoading(false);
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-black via-zinc-800 to-black">
      <Navbar />
      <div className="flex justify-center items-center min-h-screen w-full px-4">
        <div
          style={{
            width: "100%",
            height: "600px",
            position: "fixed",
            zIndex: 0,
          }}
        >
          <Threads
            amplitude={1}
            distance={0}
            enableMouseInteraction={true}
            color={[1, 1, 1]}
          />
        </div>
        <div className="w-full max-w-md p-8 space-y-6 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl z-10">
          <div className="flex justify-center mb-4">
            <Avatar
              alt="Profile Image"
              src={"../assets/finance_app_login_signup_logo.png"}
              sx={{ width: 125, height: 125 }}
              className=""
            />
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-amber-400">
              Create Account
            </h2>
            <p className="mt-2 text-amber-100/80">Sign up to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-400 bg-red-500/10 backdrop-blur-sm border border-red-500/20 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-amber-100/90">
                Username
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-amber-100 placeholder-amber-100/40 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-transparent backdrop-blur-sm transition"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                placeholder="Choose a username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-amber-100/90">
                Email
              </label>
              <input
                type="email"
                className="mt-1 block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-amber-100 placeholder-amber-100/40 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-transparent backdrop-blur-sm transition"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-amber-100/90">
                Password
              </label>
              <input
                type="password"
                className="mt-1 block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-amber-100 placeholder-amber-100/40 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-transparent backdrop-blur-sm transition"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Create a password"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-amber-100/90">
                Confirm Password
              </label>
              <input
                type="password"
                className="mt-1 block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-amber-100 placeholder-amber-100/40 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-transparent backdrop-blur-sm transition"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                placeholder="Confirm your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-amber-400 hover:bg-amber-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-amber-400/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <div className="flex justify-center items-center">
            <div className="flex text-sm text-amber-100/70 gap-2">
              Already have an account?{" "}
              <p
                className="text-amber-400 hover:text-amber-300 font-semibold transition cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Sign in
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
