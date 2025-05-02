import React from "react";
import useLogin from "../components/uselogin";
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiLogIn, FiEye } from "react-icons/fi";

const LoginPage = () => {
  const { email, password, setEmail, setPassword, handleLogin, error } = useLogin();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl">
            <FiLogIn />
          </div>
          <h1 className="text-xl font-bold mt-2">Admin Login</h1>
          <p className="text-sm text-slate-500">Enter your credentials to access the admin panel</p>
        </div>

        <form onSubmit={(e) => handleLogin(e, navigate)} className="space-y-4 text-left">
          <div>
            <label className="block text-sm text-slate-600 mb-1">Email</label>
            <div className="flex items-center border border-slate-300 bg-slate-50 rounded-lg px-3 py-2">
              <FiMail className="text-slate-400 mr-2" />
              <input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent focus:outline-none text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">Password</label>
            <div className="flex items-center border border-slate-300 bg-slate-50 rounded-lg px-3 py-2">
              <FiLock className="text-slate-400 mr-2" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-transparent focus:outline-none text-sm"
              />
              <FiEye className="text-slate-300" />
            </div>
            <div className="text-right mt-1">
              <a href="#" className="text-xs text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>
          </div>

          {error && <p className="text-red-600 text-sm -mt-2">{error}</p>}

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
            Login
          </button>
        </form>

        <div className="border-t border-slate-200 mt-6 pt-4 text-xs text-slate-400">
          Protected area. Unauthorized access is prohibited and will be logged.
        </div>
      </div>

      <footer className="absolute bottom-4 text-xs text-slate-400 text-center">
        © 2025 AdminPanel. All rights reserved.
      </footer>
    </div>
  );
};

export default LoginPage;
