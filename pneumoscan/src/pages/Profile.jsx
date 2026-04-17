import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Lock, Save, AlertCircle, CheckCircle, Settings, Shield, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000";

export default function Profile() {
  const { user, login } = useAuth();
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/api/auth/profile`, {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        let err;
        try {
          err = await res.json();
        } catch {
          const text = await res.text();
          throw new Error(text || "Failed to update profile");
        }
        throw new Error(err.message || "Failed to update profile");
      }

      const data = await res.json();
      login(data.user); // Update user in context
      addToast("Profile updated successfully!", "success");
    } catch (err) {
      addToast(err.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      addToast("New passwords do not match", "error");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      addToast("New password must be at least 6 characters long", "error");
      return;
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/api/auth/change-password`, {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      if (!res.ok) {
        let err;
        try {
          err = await res.json();
        } catch {
          const text = await res.text();
          throw new Error(text || "Failed to change password");
        }
        throw new Error(err.message || "Failed to change password");
      }

      addToast("Password changed successfully!", "success");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      addToast(err.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const tabVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 pt-28 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg shadow-blue-600/25 mb-4">
            <User size={36} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-2">
            Profile Settings
          </h1>
          <p className="text-slate-600 text-lg">Manage your account and security preferences</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl shadow-slate-900/10 border border-white/50 overflow-hidden"
        >
          {/* Tab Navigation */}
          <div className="bg-linear-to-r from-slate-50 to-blue-50/50 border-b border-slate-200/50">
            <div className="max-w-2xl mx-auto px-6">
              <div className="flex justify-center">
                <div className="flex bg-white/60 backdrop-blur-sm rounded-xl p-1 shadow-sm border border-white/40">
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`relative px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                      activeTab === "profile"
                        ? "text-white bg-linear-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-600/25"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white/80"
                    }`}
                  >
                    <Settings size={18} />
                    Profile Information
                  </button>
                  <button
                    onClick={() => setActiveTab("password")}
                    className={`relative px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                      activeTab === "password"
                        ? "text-white bg-linear-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-600/25"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white/80"
                    }`}
                  >
                    <Shield size={18} />
                    Security
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <AnimatePresence mode="wait">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <motion.div
                  key="profile"
                  variants={tabVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <form onSubmit={handleProfileUpdate} className="max-w-2xl mx-auto space-y-8">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-blue-100 to-indigo-100 rounded-2xl mb-4">
                        <User className="w-8 h-8 text-blue-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-2">Personal Information</h2>
                      <p className="text-slate-600">Update your account details</p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-3">
                          Full Name
                        </label>
                        <div className="relative group">
                          <div className="absolute inset-0 bg-linear-to-r from-blue-500/10 to-indigo-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="relative bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2">
                              <User className="w-5 h-5 text-slate-400" />
                            </div>
                            <input
                              type="text"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="w-full pl-12 pr-4 py-4 bg-transparent border-0 focus:ring-0 text-slate-900 placeholder-slate-400 font-medium"
                              placeholder="Enter your full name"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-3">
                          Email Address
                        </label>
                        <div className="relative group">
                          <div className="absolute inset-0 bg-linear-to-r from-blue-500/10 to-indigo-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="relative bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2">
                              <Mail className="w-5 h-5 text-slate-400" />
                            </div>
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="w-full pl-12 pr-4 py-4 bg-transparent border-0 focus:ring-0 text-slate-900 placeholder-slate-400 font-medium"
                              placeholder="Enter your email address"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300 flex items-center justify-center gap-3"
                    >
                      <Save size={20} />
                      {isLoading ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          />
                          Updating Profile...
                        </>
                      ) : (
                        "Update Profile"
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              )}

              {/* Password Tab */}
              {activeTab === "password" && (
                <motion.div
                  key="password"
                  variants={tabVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <form onSubmit={handlePasswordChange} className="max-w-2xl mx-auto space-y-8">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-emerald-100 to-teal-100 rounded-2xl mb-4">
                        <Shield className="w-8 h-8 text-emerald-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-2">Security Settings</h2>
                      <p className="text-slate-600">Change your password to keep your account secure</p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-3">
                          Current Password
                        </label>
                        <div className="relative group">
                          <div className="absolute inset-0 bg-linear-to-r from-emerald-500/10 to-teal-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="relative bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2">
                              <Lock className="w-5 h-5 text-slate-400" />
                            </div>
                            <input
                              type={showPasswords.current ? "text" : "password"}
                              value={passwordData.currentPassword}
                              onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                              className="w-full pl-12 pr-12 py-4 bg-transparent border-0 focus:ring-0 text-slate-900 placeholder-slate-400 font-medium"
                              placeholder="Enter current password"
                              required
                            />
                            <button
                              type="button"
                              onClick={() => togglePasswordVisibility('current')}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                            >
                              {showPasswords.current ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-3">
                          New Password
                        </label>
                        <div className="relative group">
                          <div className="absolute inset-0 bg-linear-to-r from-emerald-500/10 to-teal-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="relative bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2">
                              <Lock className="w-5 h-5 text-slate-400" />
                            </div>
                            <input
                              type={showPasswords.new ? "text" : "password"}
                              value={passwordData.newPassword}
                              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                              className="w-full pl-12 pr-12 py-4 bg-transparent border-0 focus:ring-0 text-slate-900 placeholder-slate-400 font-medium"
                              placeholder="Enter new password"
                              required
                            />
                            <button
                              type="button"
                              onClick={() => togglePasswordVisibility('new')}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                            >
                              {showPasswords.new ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-3">
                          Confirm New Password
                        </label>
                        <div className="relative group">
                          <div className="absolute inset-0 bg-linear-to-r from-emerald-500/10 to-teal-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="relative bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2">
                              <Lock className="w-5 h-5 text-slate-400" />
                            </div>
                            <input
                              type={showPasswords.confirm ? "text" : "password"}
                              value={passwordData.confirmPassword}
                              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                              className="w-full pl-12 pr-12 py-4 bg-transparent border-0 focus:ring-0 text-slate-900 placeholder-slate-400 font-medium"
                              placeholder="Confirm new password"
                              required
                            />
                            <button
                              type="button"
                              onClick={() => togglePasswordVisibility('confirm')}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                            >
                              {showPasswords.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-linear-to-r from-emerald-600 to-teal-600 text-white py-4 px-6 rounded-xl font-semibold shadow-lg shadow-emerald-600/25 hover:shadow-xl hover:shadow-emerald-600/30 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300 flex items-center justify-center gap-3"
                    >
                      <Shield size={20} />
                      {isLoading ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          />
                          Changing Password...
                        </>
                      ) : (
                        "Change Password"
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}