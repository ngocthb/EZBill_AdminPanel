import React, { useState, useEffect } from "react";
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Database,
  Save,
  Eye,
  EyeOff,
  Mail,
  Lock,
  Building,
  Clock,
  Download,
  Smartphone,
  FileText,
  Key,
  Monitor,
  Sun,
  Moon,
  Languages,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";

const SettingsPanel: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    // Profile Settings
    companyName: "EZBill",
    adminEmail: "admin@ezbill.com",
    adminName: "Administrator",

    // Notification Settings
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true,

    // Security Settings
    twoFactorAuth: false,
    sessionTimeout: "30",

    // Appearance Settings
    theme: isDark ? "dark" : "light", // Ensure theme is a string
    language: language,

    // System Settings
    autoBackup: true,
    backupFrequency: "daily",
  });

  // Update theme on change
  useEffect(() => {
    if (settings.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (settings.theme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      // auto: follow system
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [settings.theme]);

  // Update theme synchronization logic
  useEffect(() => {
    setSettings((prev) => ({
      ...prev,
      theme: isDark ? "dark" : "light",
    }));
  }, [isDark]);

  const handleInputChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // In a real app, this would save to backend
    alert(t("settingsSaved"));
  };

  const handleThemeChange = (value: string) => {
    if ((value === "dark" && !isDark) || (value === "light" && isDark)) {
      toggleTheme();
    }
    setSettings((prev) => ({ ...prev, theme: value }));
  };

  const ToggleSwitch = ({
    checked,
    onChange,
    disabled = false,
  }: {
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
  }) => (
    <label
      className={`relative inline-flex items-center cursor-pointer ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
    </label>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
            <User size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("settings")}</h1>
            <p className="text-blue-100">{t("manageYourAccountSettings")}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <User className="text-white" size={20} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t("profileSettings")}
                </h3>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <Building size={16} />
                    {t("companyName")}
                  </label>
                  <input
                    type="text"
                    value={settings.companyName}
                    onChange={(e) =>
                      handleInputChange("companyName", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <User size={16} />
                    {t("adminName")}
                  </label>
                  <input
                    type="text"
                    value={settings.adminName}
                    onChange={(e) =>
                      handleInputChange("adminName", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <Mail size={16} />
                  {t("adminEmail")}
                </label>
                <input
                  type="email"
                  value={settings.adminEmail}
                  onChange={(e) =>
                    handleInputChange("adminEmail", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors">
            <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500 rounded-lg">
                  <Shield className="text-white" size={20} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t("securitySettings")}
                </h3>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div className="flex items-center gap-3">
                  <Key className="text-red-500" size={20} />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      {t("twoFactorAuth")}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t("addExtraLayerSecurity")}
                    </p>
                  </div>
                </div>
                <ToggleSwitch
                  checked={settings.twoFactorAuth}
                  onChange={(checked) =>
                    handleInputChange("twoFactorAuth", checked)
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <Clock size={16} />
                  {t("sessionTimeout")}
                </label>
                <select
                  value={settings.sessionTimeout}
                  onChange={(e) =>
                    handleInputChange("sessionTimeout", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                >
                  <option value="15">{t("minutes15")}</option>
                  <option value="30">{t("minutes30")}</option>
                  <option value="60">{t("hour1")}</option>
                  <option value="120">{t("hours2")}</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Notification Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-600 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500 rounded-lg">
                  <Bell className="text-white" size={20} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t("notificationSettings")}
                </h3>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="text-green-500" size={18} />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      {t("emailNotifications")}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {t("receiveNotificationsViaEmail")}
                    </p>
                  </div>
                </div>
                <ToggleSwitch
                  checked={settings.emailNotifications}
                  onChange={(checked) =>
                    handleInputChange("emailNotifications", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="text-green-500" size={18} />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      {t("pushNotifications")}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {t("receivePushNotifications")}
                    </p>
                  </div>
                </div>
                <ToggleSwitch
                  checked={settings.pushNotifications}
                  onChange={(checked) =>
                    handleInputChange("pushNotifications", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="text-green-500" size={18} />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      {t("weeklyReports")}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {t("receiveWeeklyReports")}
                    </p>
                  </div>
                </div>
                <ToggleSwitch
                  checked={settings.weeklyReports}
                  onChange={(checked) =>
                    handleInputChange("weeklyReports", checked)
                  }
                />
              </div>
            </div>
          </div>

          {/* Appearance Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors">
            <div className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-gray-700 dark:to-gray-600 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500 rounded-lg">
                  <Palette className="text-white" size={20} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t("appearanceSettings")}
                </h3>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <Monitor size={16} />
                  {t("theme")}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: "light", icon: Sun, label: t("light") },
                    { value: "dark", icon: Moon, label: t("dark") },
                    { value: "auto", icon: Monitor, label: t("auto") },
                  ].map(({ value, icon: Icon, label }) => {
                    const isActive = settings.theme === value;
                    return (
                      <button
                        key={value}
                        onClick={() => handleThemeChange(value)}
                        className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                          settings.theme === value
                            ? "border-purple-600 bg-purple-100 dark:bg-purple-900/40 shadow-md text-purple-700 dark:text-purple-200"
                            : "border-gray-200 dark:border-gray-600 hover:border-purple-400 bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-300"
                        }`}
                        type="button"
                        aria-pressed={settings.theme === value}
                      >
                        <Icon
                          size={22}
                          className={
                            settings.theme === value
                              ? "text-purple-600 dark:text-purple-300"
                              : "text-gray-400 dark:text-gray-400"
                          }
                        />
                        <span className="text-xs font-medium">{label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <Languages size={16} />
                  {t("language")}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: "en", label: "English", flag: "🇺🇸" },
                    { value: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
                  ].map(({ value, label, flag }) => {
                    const isActive = language === value;
                    return (
                      <button
                        key={value}
                        onClick={() => setLanguage(value as "en" | "vi")}
                        className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                          isActive
                            ? "border-purple-600 bg-purple-100 dark:bg-purple-900/40 shadow-md text-purple-700 dark:text-purple-200"
                            : "border-gray-200 dark:border-gray-600 hover:border-purple-400 bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-300"
                        }`}
                        type="button"
                        aria-pressed={isActive}
                      >
                        <span
                          className={`text-lg ${isActive ? "drop-shadow" : ""}`}
                        >
                          {flag}
                        </span>
                        <span className="text-sm font-medium">{label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* System Settings */}
          {/* <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors">
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-gray-700 dark:to-gray-600 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-500 rounded-lg">
                  <Database className="text-white" size={20} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t("systemSettings")}
                </h3>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Download className="text-orange-500" size={18} />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      {t("autoBackup")}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {t("automaticallyBackup")}
                    </p>
                  </div>
                </div>
                <ToggleSwitch
                  checked={settings.autoBackup}
                  onChange={(checked) =>
                    handleInputChange("autoBackup", checked)
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("backupFrequency")}
                </label>
                <select
                  value={settings.backupFrequency}
                  onChange={(e) =>
                    handleInputChange("backupFrequency", e.target.value)
                  }
                  disabled={!settings.autoBackup}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="daily">{t("daily")}</option>
                  <option value="weekly">{t("weekly")}</option>
                  <option value="monthly">{t("monthly")}</option>
                </select>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-center">
        <button
          onClick={handleSave}
          className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <Save size={24} />
          {t("saveSettings")}
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;
