import React, { createContext, useContext, useState } from "react";

type Language = "en" | "vi";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    overview: "Overview",
    user: "User",
    feedback: "Feedback",
    settings: "Settings",

    // Dashboard
    dashboards: "Dashboards",
    search: "Search...",

    // Stats
    newUsers: "New Users",
    premiumUsers: "Premium Users",
    totalUsers: "Total Users",
    activeUsers: "Active Users",
    newThisMonth: "New This Month",
    churnRate: "Churn Rate",
    totalReviews: "Total Reviews",
    averageRating: "Average Rating",
    pendingReviews: "Pending Reviews",

    // Charts
    userGrowth: "User Growth",
    monthlyUserAcquisition: "Monthly user acquisition trends",
    weeklyRevenue: "Weekly Revenue",
    revenueBreakdown: "Revenue breakdown by day",
    userDistribution: "User Distribution",
    breakdownByUserType: "Breakdown by user type",

    // Tables
    userMember: "User Member",
    userName: "User Name",
    email: "Email",
    phoneNumber: "Phone Number",
    membership: "Membership",
    participationDay: "Participation Day",
    customerFeedback: "Customer Feedback",
    user: "User",
    rating: "Rating",
    message: "Message",
    date: "Date",
    status: "Status",
    allStatus: "All Status",
    new: "New",
    reviewed: "Reviewed",
    resolved: "Resolved",

    // Settings
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

    // Pagination
    rowsPerPage: "Rows per page:",
    showing: "Showing",
    of: "of",
    previous: "Previous",
    next: "Next",

    // Common
    labelText: "LABEL TEXT",
    textCell: "Text Cell",
    settingsSaved: "Settings saved successfully!",

    // Auth
    logout: "Logout",
    welcomeBack: "Welcome Back",
    signInToAccount: "Sign in to your account",
    enterEmail: "Enter your email",
    enterPassword: "Enter your password",
    rememberMe: "Remember me",
    forgotPassword: "Forgot password?",
    signIn: "Sign In",
    demoCredentials: "Demo Credentials",
    allRightsReserved: "All rights reserved",

    // Settings
    manageYourAccountSettings: "Manage your account settings and preferences",

    // Settings
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

    // Common
    settingsSaved: "Settings saved successfully!",
    welcomeBack: "Welcome Back",
    signInToAccount: "Sign in to your account",
    enterEmail: "Enter your email",
    enterPassword: "Enter your password",
    rememberMe: "Remember me",
    forgotPassword: "Forgot password?",
    signIn: "Sign In",
    demoCredentials: "Demo Credentials",
    allRightsReserved: "All rights reserved",

    // Notifications
    notifications: "Notifications",
    markAllRead: "Mark all as read",
    noNotifications: "No notifications",
    markAsRead: "Mark as read",
    remove: "Remove",
    viewAllNotifications: "View all notifications",
    allNotifications: "All Notifications",
    unreadNotifications: "unread notifications",
    total: "total",
    searchNotifications: "Search notifications...",
    allTypes: "All Types",
    info: "Info",
    success: "Success",
    warning: "Warning",
    error: "Error",
    unread: "Unread",
    read: "Read",
    noNotificationsFound: "No notifications found",
    tryAdjustingFilters: "Try adjusting your search or filters",

    // login
    login: "Login",
    password: "Password",
    rememberMe: "Remember Me",
    forgotPassword: "Forgot Password?",
    orSignInWith: "Or sign in with",
  },
  vi: {
    // Navigation
    overview: "Tổng quan",
    user: "Người dùng",
    feedback: "Phản hồi",
    settings: "Cài đặt",

    // Dashboard
    dashboards: "Bảng điều khiển",
    search: "Tìm kiếm...",

    // Stats
    newUsers: "Người dùng mới",
    premiumUsers: "Người dùng Premium",
    totalUsers: "Tổng người dùng",
    activeUsers: "Người dùng hoạt động",
    newThisMonth: "Mới tháng này",
    churnRate: "Tỷ lệ rời bỏ",
    totalReviews: "Tổng đánh giá",
    averageRating: "Đánh giá trung bình",
    pendingReviews: "Đánh giá chờ xử lý",

    // Charts
    userGrowth: "Tăng trưởng người dùng",
    monthlyUserAcquisition: "Xu hướng thu hút người dùng hàng tháng",
    weeklyRevenue: "Doanh thu tuần",
    revenueBreakdown: "Phân tích doanh thu theo ngày",
    userDistribution: "Phân bố người dùng",
    breakdownByUserType: "Phân tích theo loại người dùng",

    // Tables
    userMember: "Thành viên",
    userName: "Tên người dùng",
    email: "Email",
    phoneNumber: "Số điện thoại",
    membership: "Thành viên",
    participationDay: "Ngày tham gia",
    customerFeedback: "Phản hồi khách hàng",
    user: "Người dùng",
    rating: "Đánh giá",
    message: "Tin nhắn",
    date: "Ngày",
    status: "Trạng thái",
    allStatus: "Tất cả trạng thái",
    new: "Mới",
    reviewed: "Đã xem",
    resolved: "Đã giải quyết",

    // Settings
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

    // Pagination
    rowsPerPage: "Số hàng mỗi trang:",
    showing: "Hiển thị",
    of: "của",
    previous: "Trước",
    next: "Tiếp",

    // Common
    labelText: "NHÃN",
    textCell: "Ô văn bản",
    settingsSaved: "Đã lưu cài đặt thành công!",

    // Auth
    logout: "Đăng xuất",
    welcomeBack: "Chào mừng trở lại",
    signInToAccount: "Đăng nhập vào tài khoản của bạn",
    enterEmail: "Nhập email của bạn",
    enterPassword: "Nhập mật khẩu của bạn",
    rememberMe: "Ghi nhớ đăng nhập",
    forgotPassword: "Quên mật khẩu?",
    signIn: "Đăng nhập",
    demoCredentials: "Thông tin demo",
    allRightsReserved: "Bảo lưu mọi quyền",

    // Settings
    manageYourAccountSettings: "Quản lý cài đặt và tùy chọn tài khoản của bạn",

    // Settings
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

    // Common
    settingsSaved: "Đã lưu cài đặt thành công!",
    welcomeBack: "Chào mừng trở lại",
    signInToAccount: "Đăng nhập vào tài khoản của bạn",
    enterEmail: "Nhập email của bạn",
    enterPassword: "Nhập mật khẩu của bạn",
    rememberMe: "Ghi nhớ đăng nhập",
    forgotPassword: "Quên mật khẩu?",
    signIn: "Đăng nhập",
    demoCredentials: "Thông tin demo",
    allRightsReserved: "Bảo lưu mọi quyền",

    // Notifications
    notifications: "Thông báo",
    markAllRead: "Đánh dấu tất cả đã đọc",
    noNotifications: "Không có thông báo",
    markAsRead: "Đánh dấu đã đọc",
    remove: "Xóa",
    viewAllNotifications: "Xem tất cả thông báo",
    allNotifications: "Tất cả thông báo",
    unreadNotifications: "thông báo chưa đọc",
    total: "tổng cộng",
    searchNotifications: "Tìm kiếm thông báo...",
    allTypes: "Tất cả loại",
    info: "Thông tin",
    success: "Thành công",
    warning: "Cảnh báo",
    error: "Lỗi",
    unread: "Chưa đọc",
    read: "Đã đọc",
    noNotificationsFound: "Không tìm thấy thông báo",
    tryAdjustingFilters: "Thử điều chỉnh tìm kiếm hoặc bộ lọc",

    // login
    login: "Đăng nhập",
    password: "Mật khẩu",
    rememberMe: "Ghi nhớ đăng nhập",
    forgotPassword: "Quên mật khẩu?",
    orSignInWith: "Hoặc đăng nhập với",
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
