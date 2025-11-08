import React, { createContext, useContext, useState } from "react";

type Language = "en" | "vi";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    overview: "Overview",
    user: "User",
    feedback: "Feedback",
    settings: "Settings",
    dashboards: "Dashboards",
    search: "Search...",

    // Stats
    newUsers: "New Users",
    premiumUsers: "Premium Users",
    totalUsers: "Total Users",
    activeUsers: "Active Users",
    newThisMonth: "Premium  Users",
    churnRate: "VIP Users",

    // Charts
    userGrowth: "User Growth",
    monthlyUserAcquisition: "Monthly user acquisition trends",
    weeklyRevenue: "Weekly Revenue",
    revenueBreakdown: "Revenue breakdown by day",
    userDistribution: "User Distribution",
    breakdownByUserType: "Breakdown by user type",

    // Tables & common
    userMember: "User Member",
    userAccounts: "User Accounts",
    userName: "User Name",
    email: "Email",
    phoneNumber: "Phone Number",
    nickname: "Nickname",
    role: "Role",
    membership: "Membership",
    participationDay: "Participation Day",
    customerFeedback: "Customer Feedback",
    rating: "Rating",
    message: "Message",
    date: "Date",
    status: "Status",
    allStatus: "All Status",
    new: "New",
    reviewed: "Reviewed",
    resolved: "Resolved",

    // Auth & settings
    profileSettings: "Profile Settings",
    companyName: "Company Name",
    adminName: "Admin Name",
    adminEmail: "Admin Email",
    notificationSettings: "Notification Settings",
    emailNotifications: "Email Notifications",
    receiveNotificationsViaEmail: "Receive notifications via email",
    pushNotifications: "Push Notifications",
    receivePushNotifications: "Receive push notifications in browser",
    weeklyReports: "Weekly Reports",
    receiveWeeklyReports: "Receive weekly analytics reports",
    securitySettings: "Security Settings",
    twoFactorAuth: "Two-Factor Authentication",
    addExtraLayerSecurity: "Add an extra layer of security to your account",
    sessionTimeout: "Session Timeout (minutes)",
    appearanceSettings: "Appearance Settings",
    theme: "Theme",
    language: "Language",
    systemSettings: "System Settings",
    autoBackup: "Auto Backup",
    automaticallyBackup: "Automatically backup system data",
    backupFrequency: "Backup Frequency",
    saveSettings: "Save Settings",

    // Theme options
    light: "Light",
    dark: "Dark",
    auto: "Auto",

    // Time options
    minutes15: "15 minutes",
    minutes30: "30 minutes",
    hour1: "1 hour",
    hours2: "2 hours",

    // Backup options
    daily: "Daily",
    weekly: "Weekly",
    monthly: "Monthly",

    // Languages
    english: "English",
    vietnamese: "Tiếng Việt",

    // Pagination / common labels used across components
    rowsPerPage: "Rows per page:",
    showing: "Showing",
    of: "of",
    previous: "Previous",
    next: "Next",
    Page: "Page",

    // Generic
    labelText: "LABEL TEXT",
    textCell: "Text Cell",
    settingsSaved: "Settings saved successfully!",

    // Auth
    logout: "Logout",
    login: "Login",
    password: "Password",
    welcomeBack: "Welcome Back",
    signInToAccount: "Sign in to your account",
    enterEmail: "Enter your email",
    enterPassword: "Enter your password",
    enterEmailPlaceholder: "Enter your email address",
    enterPasswordPlaceholder: "Enter your password",
    rememberMe: "Remember me",
    forgotPassword: "Forgot password?",
    signIn: "Sign In",
    demoCredentials: "Demo Credentials",
    allRightsReserved: "All rights reserved",
    invalidCredentials:
      "Invalid email or password. Only demo accounts are allowed.",

    // Revenue page labels
    revenue: "Revenue",
    Revenue: "Revenue",
    "Revenue Overview": "Revenue Overview",
    "Total Revenue": "Total Revenue",
    "Monthly Growth": "Monthly Growth",
    Source: "Source",
    Amount: "Amount",
    monthlyRevenue: "Monthly Revenue",
    realtimePayments: "Real-time Payments",
    plan: "Plan",
    amount: "Amount",
    Month: "Month",
    Year: "Year",
    "Total Amount": "Total Amount",
  },
  vi: {
    overview: "Tổng quan",
    user: "Người dùng",
    feedback: "Phản hồi",
    settings: "Cài đặt",
    dashboards: "Bảng điều khiển",
    search: "Tìm kiếm...",

    // Stats
    newUsers: "Người dùng mới",
    premiumUsers: "Người dùng Premium",
    totalUsers: "Tổng người dùng",
    activeUsers: "Người dùng hoạt động",
    newThisMonth: "Người dừng premium",
    churnRate: "Người dùng VIP",

    // Charts
    userGrowth: "Tăng trưởng người dùng",
    monthlyUserAcquisition: "Xu hướng thu hút người dùng hàng tháng",
    weeklyRevenue: "Doanh thu tuần",
    revenueBreakdown: "Phân tích doanh thu theo tháng",
    userDistribution: "Phân bố người dùng",
    breakdownByUserType: "Phân tích theo loại người dùng",

    // Tables & common
    userMember: "Thành viên",
    userAccounts: "Tài khoản người dùng",
    userName: "Tên người dùng",
    email: "Email",
    phoneNumber: "Số điện thoại",
    nickname: "Biệt hiệu",
    role: "Vai trò",
    membership: "Thành viên",
    participationDay: "Ngày tham gia",
    customerFeedback: "Phản hồi khách hàng",
    rating: "Đánh giá",
    message: "Tin nhắn",
    date: "Ngày",
    status: "Trạng thái",
    allStatus: "Tất cả trạng thái",
    new: "Mới",
    reviewed: "Đã xem",
    resolved: "Đã giải quyết",

    // Auth & settings
    profileSettings: "Cài đặt hồ sơ",
    companyName: "Tên công ty",
    adminName: "Tên quản trị viên",
    adminEmail: "Email quản trị viên",
    notificationSettings: "Cài đặt thông báo",
    emailNotifications: "Thông báo Email",
    receiveNotificationsViaEmail: "Nhận thông báo qua email",
    pushNotifications: "Thông báo đẩy",
    receivePushNotifications: "Nhận thông báo đẩy trên trình duyệt",
    weeklyReports: "Báo cáo tuần",
    receiveWeeklyReports: "Nhận báo cáo phân tích hàng tuần",
    securitySettings: "Cài đặt bảo mật",
    twoFactorAuth: "Xác thực hai yếu tố",
    addExtraLayerSecurity: "Thêm lớp bảo mật bổ sung cho tài khoản",
    sessionTimeout: "Thời gian chờ phiên (phút)",
    appearanceSettings: "Cài đặt giao diện",
    theme: "Chủ đề",
    language: "Ngôn ngữ",
    systemSettings: "Cài đặt hệ thống",
    autoBackup: "Sao lưu tự động",
    automaticallyBackup: "Tự động sao lưu dữ liệu hệ thống",
    backupFrequency: "Tần suất sao lưu",
    saveSettings: "Lưu cài đặt",

    // Theme options
    light: "Sáng",
    dark: "Tối",
    auto: "Tự động",

    // Time options
    minutes15: "15 phút",
    minutes30: "30 phút",
    hour1: "1 giờ",
    hours2: "2 giờ",

    // Backup options
    daily: "Hàng ngày",
    weekly: "Hàng tuần",
    monthly: "Hàng tháng",

    // Languages
    english: "English",
    vietnamese: "Tiếng Việt",

    // Pagination / common labels
    rowsPerPage: "Số hàng mỗi trang:",
    showing: "Hiển thị",
    of: "của",
    previous: "Trước",
    next: "Tiếp",
    Page: "Trang",

    // Generic
    labelText: "NHÃN",
    textCell: "Ô văn bản",
    settingsSaved: "Đã lưu cài đặt thành công!",

    // Auth
    logout: "Đăng xuất",
    login: "Đăng nhập",
    password: "Mật khẩu",
    welcomeBack: "Chào mừng trở lại",
    signInToAccount: "Đăng nhập vào tài khoản của bạn",
    enterEmail: "Nhập email của bạn",
    enterPassword: "Nhập mật khẩu của bạn",
    enterEmailPlaceholder: "Nhập địa chỉ email của bạn",
    enterPasswordPlaceholder: "Nhập mật khẩu của bạn",
    rememberMe: "Ghi nhớ đăng nhập",
    forgotPassword: "Quên mật khẩu?",
    signIn: "Đăng nhập",
    demoCredentials: "Thông tin demo",
    allRightsReserved: "Bảo lưu mọi quyền",
    invalidCredentials:
      "Email hoặc mật khẩu không hợp lệ. Chỉ cho phép tài khoản demo.",

    // Revenue page labels
    revenue: "Doanh thu",
    Revenue: "Doanh thu",
    "Revenue Overview": "Tổng quan doanh thu",
    "Total Revenue": "Tổng doanh thu",
    "Monthly Growth": "Tăng trưởng tháng",
    Source: "Nguồn",
    Amount: "Số tiền",
    monthlyRevenue: "Doanh thu hàng tháng",
    realtimePayments: "Thanh toán thời gian thực",
    plan: "Gói",
    amount: "Số tiền",
    Month: "Tháng",
    Year: "Năm",
    "Total Amount": "Tổng số tiền",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language") as Language;
    return saved || "en";
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return (
      translations[language][key as keyof (typeof translations)["en"]] || key
    );
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: handleSetLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
