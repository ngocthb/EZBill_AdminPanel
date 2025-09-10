import React from "react";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Settings,
  ChevronRight,
  LogOut,
  Bell,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

interface SidebarProps {
  activeItem: string;
  onItemClick: (item: string) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeItem,
  onItemClick,
  onLogout,
}) => {
  const { t } = useLanguage();

  const menuItems = [
    { id: "overview", label: t("overview"), icon: LayoutDashboard },
    { id: "user", label: t("user"), icon: Users },
    { id: "feedback", label: t("feedback"), icon: MessageSquare },
    { id: "notifications", label: t("notifications"), icon: Bell },
    { id: "settings", label: t("settings"), icon: Settings },
  ];

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-screen fixed left-0 top-0 transition-colors flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <img
            src="../../assets/images/logo.png"
            alt="Logo"
            className="w-10 h-10 rounded-lg flex items-center justify-center"
          />

          <span className="font-semibold text-blue-600 dark:text-white">
            EzBill
          </span>
        </div>

        <nav className="space-y-1 flex-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onItemClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                  isActive
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-r-2 border-blue-500"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
                {isActive && <ChevronRight size={16} className="ml-auto" />}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            <div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                ByeWind
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                © 2023 ByeWind
              </div>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="p-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            title={t("logout")}
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
