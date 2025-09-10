import React, { useState } from "react";
import { Eye, EyeOff, Sun, Moon } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const { isDark, toggleTheme } = useTheme();
  const { t, language, setLanguage } = useLanguage();
  // Ensure re-render on language change

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "admin@ezbill.com",
    password: "admin123",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="w-full h-full flex items-center justify-center p-12 relative">
          {/* Background circles */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-200/40 rounded-full"></div>

          {/* Logo */}
          <div className="absolute top-8 left-8">
            <div className="text-2xl font-bold text-blue-600">EzBill</div>
          </div>

          {/* Main illustration area */}
          <div className="relative z-10 flex items-center justify-center">
            {/* Rocket */}
            <div className="relative mr-8">
              <div className="w-24 h-32 bg-gradient-to-b from-blue-400 to-blue-600 rounded-t-full rounded-b-lg relative">
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-200 rounded-full"></div>
                <div className="absolute bottom-2 left-2 w-3 h-6 bg-blue-800 rounded"></div>
                <div className="absolute bottom-2 right-2 w-3 h-6 bg-blue-800 rounded"></div>
              </div>
              {/* Rocket flames */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-gradient-to-b from-orange-400 to-red-500 rounded-b-lg"></div>
            </div>

            {/* Person sitting */}
            <div className="relative">
              {/* Person */}
              <div className="w-20 h-20 relative">
                {/* Head */}
                <div className="w-8 h-8 bg-amber-200 rounded-full absolute top-0 left-6"></div>
                {/* Hair */}
                <div className="w-10 h-6 bg-gray-800 rounded-t-full absolute -top-1 left-5"></div>
                {/* Body */}
                <div className="w-12 h-16 bg-gray-700 rounded-lg absolute top-6 left-4"></div>
                {/* Arms */}
                <div className="w-4 h-8 bg-amber-200 rounded absolute top-8 left-1"></div>
                <div className="w-4 h-8 bg-amber-200 rounded absolute top-8 right-1"></div>
                {/* Legs */}
                <div className="w-14 h-8 bg-gray-800 rounded-b-lg absolute bottom-0 left-3"></div>
              </div>

              {/* Laptop */}
              <div className="absolute bottom-2 left-12 w-8 h-6 bg-gray-300 rounded transform rotate-12"></div>
            </div>

            {/* Decorative plants */}
            <div className="absolute left-8 bottom-16">
              <div className="w-2 h-8 bg-green-600"></div>
              <div className="w-6 h-3 bg-green-400 rounded-t-full -mt-1"></div>
              <div className="w-4 h-2 bg-green-400 rounded-t-full -mt-1 ml-1"></div>
            </div>

            <div className="absolute right-8 top-16">
              <div className="w-3 h-6 bg-green-500"></div>
              <div className="w-2 h-4 bg-green-400 -mt-2 ml-2"></div>
              <div className="w-2 h-3 bg-green-400 -mt-1"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Theme and Language toggle */}
          <div className="flex justify-end items-center gap-4 mb-8">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              {isDark ? (
                <Sun size={20} className="text-yellow-400" /> // Bright yellow for dark mode
              ) : (
                <Moon size={20} className="text-gray-800" /> // Dark gray for light mode
              )}
            </button>
            <button
              onClick={() => setLanguage(language === "en" ? "vi" : "en")}
              className={`p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                isDark ? "text-white" : ""
              }`}
            >
              {language === "en" ? "🇺🇸" : "🇻🇳"}
            </button>
          </div>

          {/* Login Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              {t("login")}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t("password")}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    {t("rememberMe")}
                  </span>
                </label>
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400"
                >
                  {t("forgotPassword")}
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {t("login")}
              </button>
            </form>

            {/* Social Login */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white dark:bg-gray-800 text-gray-500">
                    {t("orSignInWith")}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex justify-center gap-4">
                <button className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-colors">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </button>
                <button className="w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-colors">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </button>
                <button className="w-12 h-12 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{" "}
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-500 dark:text-blue-400 font-medium"
                >
                  Register Here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
