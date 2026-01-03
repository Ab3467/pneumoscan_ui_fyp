import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Activity, Menu, X, UploadCloud, Home, Info, LogOut, User, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/90 backdrop-blur-xl shadow-md py-2 border-b border-slate-200/50" 
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group relative z-50">
            <div className={`p-2.5 rounded-xl transition-all duration-300 ${
              scrolled ? "bg-blue-600 shadow-lg shadow-blue-600/20" : "bg-white shadow-md"
            }`}>
              <Activity className={`w-6 h-6 ${scrolled ? "text-white" : "text-blue-600"}`} />
            </div>
            <span className={`text-2xl font-bold tracking-tight ${
              scrolled ? "text-slate-900" : "text-slate-800"
            }`}>
              Pneumo<span className="text-blue-600">Scan</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center bg-white/50 backdrop-blur-md px-2 py-1.5 rounded-full border border-white/20 shadow-sm">
            <div className="flex items-center px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    location.pathname === link.path
                      ? "text-blue-600 bg-blue-50"
                      : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="h-6 w-px bg-slate-200 mx-2" />

            <div className="flex items-center gap-3 pl-2 pr-2">
              {user ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full">
                    <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <span className="text-sm font-medium text-slate-700">{user.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    title="Logout"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-5 py-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-5 py-2.5 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 hover:-translate-y-0.5 flex items-center gap-2"
                  >
                    Sign Up
                    <ChevronRight size={16} />
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center relative z-50">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-xl z-50 md:hidden p-4 rounded-b-3xl"
            >
              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`p-4 rounded-xl text-base font-medium flex items-center gap-3 transition-colors ${
                      location.pathname === link.path
                        ? "bg-blue-50 text-blue-600"
                        : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${
                      location.pathname === link.path ? "bg-white" : "bg-slate-100"
                    }`}>
                      {link.icon}
                    </div>
                    {link.name}
                  </Link>
                ))}
                
                <div className="h-px bg-slate-100 my-2" />
                
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{user.name}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 p-3 text-red-600 font-medium bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
                    >
                      <LogOut size={18} />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="flex justify-center items-center py-3 text-slate-700 font-semibold bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
                    >
                      Log In
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsOpen(false)}
                      className="flex justify-center items-center py-3 text-white font-semibold bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
