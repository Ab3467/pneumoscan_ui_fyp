import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Activity, Menu, X, UploadCloud, Home, Info, LogOut, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/");
  };

  const navLinks = [
    { name: "Home", path: "/", icon: <Home size={18} /> },
    { name: "About", path: "/#about", icon: <Info size={18} /> },
  ];

  if (user) {
    navLinks.push({ name: "Scan Now", path: "/upload", icon: <UploadCloud size={18} /> });
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-700 transition-colors">
              <Activity className="text-white h-6 w-6" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              PneumoScan
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}

            <div className="flex items-center gap-4 border-l pl-8 border-gray-200">
              {user ? (
                <>
                  <div className="flex items-center gap-2 text-gray-700 font-medium">
                    <div className="bg-blue-100 p-1.5 rounded-full">
                      <User size={16} className="text-blue-600" />
                    </div>
                    <span>{user.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium text-sm"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-600 hover:text-blue-600 font-medium text-sm transition-colors"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 flex items-center gap-2"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-3 rounded-md text-base font-medium flex items-center gap-3 ${
                    location.pathname === link.path
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
              
              <div className="pt-4 mt-4 border-t border-gray-100">
                {user ? (
                  <div className="space-y-3 px-3">
                    <div className="flex items-center gap-3 text-gray-900 font-medium">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <User size={20} className="text-blue-600" />
                      </div>
                      {user.name}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-3 text-red-600 font-medium py-2"
                    >
                      <LogOut size={20} />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4 px-3">
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center py-3 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50"
                    >
                      Log In
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 shadow-lg shadow-blue-600/20"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
