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

import logo from "../../assets/images/logo.png";

interface SidebarProps {
  activeItem: string;
  onItemClick: (item: string) => void;
  onLogout: () => void;
  userRole?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeItem,
  onItemClick,
  onLogout,
  userRole,
}) => {
  const { t } = useLanguage();

  let menuItems = [] as { id: string; label: string; icon: any }[];

  if (userRole === "REVENUE_ONLY") {
    menuItems = [{ id: "revenue", label: t("revenue"), icon: MessageSquare }];
  } else {
    menuItems = [
      { id: "overview", label: t("overview"), icon: LayoutDashboard },
      { id: "user", label: t("user"), icon: Users },
      { id: "revenue", label: t("revenue"), icon: MessageSquare },
    ];
  }

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-screen fixed left-0 top-0 transition-colors flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <img
            src={logo}
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
            <div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                EzBill
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                © 2025 EzBill
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
