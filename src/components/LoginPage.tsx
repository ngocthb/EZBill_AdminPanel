import React, { useState } from "react";
import { Eye, EyeOff, Sun, Moon } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";

interface LoginPageProps {
  // pass back a user object when logging in
  onLogin: (user: {
    accountId?: string;
    role?: string;
    email?: string;
  }) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const { isDark, toggleTheme } = useTheme();
  const { t, language, setLanguage } = useLanguage();
  // Ensure re-render on language change

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const demoAccounts = [
    { email: "admin@ezbill.com", password: "admin123", role: "ADMIN" },
    {
      email: "revenue@gmail.com",
      password: "revenue123",
      role: "REVENUE_ONLY",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Kiểm tra email và password
    const matched = demoAccounts.find(
      (a) => a.email === formData.email && a.password === formData.password
    );

    if (!matched) {
      alert(t("invalidCredentials"));
      return;
    }

    const user = {
      accountId: matched.email,
      role: matched.role,
      email: matched.email,
    };

    onLogin(user);
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

            <form onSubmit={handleSubmit} className="space-y-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t("email")}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder={t("enterEmailPlaceholder")}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    placeholder={t("enterPasswordPlaceholder")}
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
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {t("login")}
              </button>
            </form>

            {/* Social Login */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
