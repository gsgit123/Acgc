import { useState, useEffect } from "react";
import { useSAuthStore } from "../store/useSAuthStore";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useSAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`min-h-[calc(100vh-64px)] bg-[#0b0f19] flex items-center justify-center transition-opacity duration-700 ease-in-out ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="w-full max-w-md p-8 bg-[#0f172a] rounded-xl shadow-2xl text-white font-['Nunito']">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-1 text-sky-400">Welcome Back</h1>
          <p className="text-gray-400">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute top-3.5 left-3 h-5 w-5 text-gray-500" />
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-md pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute top-3.5 left-3 h-5 w-5 text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-md pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                className="absolute top-3.5 right-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 rounded-md flex items-center justify-center gap-2 transition duration-300"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Loading...
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        <div className="text-center mt-6 text-gray-400 text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/SignupPageStudent" className="text-sky-400 hover:underline">
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;