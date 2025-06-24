import React, { useState, useEffect } from "react";
import { useSAuthStore } from "../store/useSAuthStore";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import toast from "react-hot-toast";

const SignupPageStudent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useSAuthStore();

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) {
      signup(formData);
    }
  };

  return (
    <div
      className={`min-h-[calc(100vh-64px)] bg-[#0b0f19] flex items-center justify-center transition-opacity duration-700 ease-in-out ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="w-full max-w-md p-8 bg-[#0f172a] rounded-xl shadow-2xl text-white font-['Nunito']">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-1 text-sky-400">Create Account</h1>
          <p className="text-gray-400">Get started with your free account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <div className="relative">
              <User className="absolute top-3.5 left-3 h-5 w-5 text-gray-500" />
              <input
                type="text"
                placeholder="John Doe"
                className="w-full bg-[#1e293b] border border-gray-700 text-white rounded-md pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />
            </div>
          </div>

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
            disabled={isSigningUp}
          >
            {isSigningUp ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Loading...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="text-center mt-6 text-gray-400 text-sm">
          Already have an account?{" "}
          <Link to="/LoginPageStudent" className="text-sky-400 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPageStudent;
