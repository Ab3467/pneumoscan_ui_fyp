import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, AlertCircle, CheckCircle, ChevronRight, Activity, Search, Filter, Download } from "lucide-react";

export default function History() {
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all"); // all, normal, pneumonia

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    filterHistory();
  }, [history, searchTerm, filterType]);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Please login to view your analysis history.");
      }

      const res = await fetch("http://localhost:5000/api/analysis", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to fetch history");
      }

      const data = await res.json();
      setHistory(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const filterHistory = () => {
    let filtered = history;

    // Filter by type
    if (filterType !== "all") {
      filtered = filtered.filter(item => 
        filterType === "normal" ? item.label === "NORMAL" : item.label === "PNEUMONIA"
      );
    }

    // Filter by search term (date or scan ID)
    if (searchTerm) {
      filtered = filtered.filter(item => {
        const date = new Date(item.createdAt).toLocaleDateString().toLowerCase();
        const scanId = item._id.substring(item._id.length - 6).toUpperCase();
        const searchLower = searchTerm.toLowerCase();
        return date.includes(searchLower) || scanId.includes(searchLower);
      });
    }

    setFilteredHistory(filtered);
  };

  const exportToCSV = () => {
    const csvData = filteredHistory.map(item => ({
      "Scan ID": item._id.substring(item._id.length - 6).toUpperCase(),
      "Date": new Date(item.createdAt).toLocaleDateString(),
      "Diagnosis": item.label === "PNEUMONIA" ? "Pneumonia" : "Normal",
      "Confidence": `${Math.round(item.confidence * 100)}%`,
    }));

    const headers = Object.keys(csvData[0]);
    const csvContent = [
      headers.join(","),
      ...csvData.map(row => headers.map(header => `"${row[header]}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `pneumoscan_history_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-12 bg-gray-50 flex items-center justify-center">
        <Activity className="w-12 h-12 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-linear-to-b from-gray-50 to-blue-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Analysis History</h1>
            <p className="text-gray-600">Track and review your previous chest X-ray diagnoses.</p>
          </div>
          <div className="flex gap-3">
            {!error && history.length > 0 && (
              <button
                onClick={exportToCSV}
                className="bg-green-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-green-700 transition flex items-center gap-2"
              >
                <Download size={16} />
                Export CSV
              </button>
            )}
            <Link
              to="/upload"
              className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition"
            >
              New Scan
            </Link>
          </div>
        </div>

        {/* Search and Filter */}
        {!error && history.length > 0 && (
          <div className="mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by date or scan ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-gray-400" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Results</option>
                  <option value="normal">Normal</option>
                  <option value="pneumonia">Pneumonia</option>
                </select>
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              Showing {filteredHistory.length} of {history.length} scans
            </div>
          </div>
        )}

        {error ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <AlertCircle size={20} />
              <p>{error}</p>
            </div>
            {error.toLowerCase().includes("login") && (
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700"
              >
                Login to view history
              </Link>
            )}
          </div>
        ) : filteredHistory.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-10 h-10 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {history.length === 0 ? "No history found" : "No matching results"}
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              {history.length === 0 
                ? "You haven't uploaded any chest X-rays yet. Start your first analysis to see it here."
                : "Try adjusting your search or filter criteria."
              }
            </p>
            {history.length === 0 ? (
              <Link
                to="/upload"
                className="inline-flex items-center gap-2 font-medium text-blue-600 hover:text-blue-700"
              >
                Upload your first scan <ChevronRight size={16} />
              </Link>
            ) : (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilterType("all");
                }}
                className="inline-flex items-center gap-2 font-medium text-blue-600 hover:text-blue-700"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHistory.map((item, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                key={item._id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all group cursor-pointer"
              >
                 <div className="aspect-video bg-gray-900 relative">
                   <img 
                     src={item.imageUrl} 
                     alt="X-ray thumbnail" 
                     className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                   />
                   <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-medium text-white flex items-center gap-2">
                     <Calendar size={14} />
                     {new Date(item.createdAt).toLocaleDateString()}
                   </div>
                 </div>
                 
                 <div className="p-5">
                   <div className="flex items-center justify-between mb-3 border-b border-gray-50 pb-3">
                     <span className="text-sm text-gray-500 font-medium">Scan ID: #{item._id.substring(item._id.length - 6).toUpperCase()}</span>
                   </div>
                   
                   <div className="flex items-end justify-between">
                     <div>
                       <div className="flex items-center gap-2 mb-1">
                         {item.label === "PNEUMONIA" ? (
                           <AlertCircle className="w-5 h-5 text-red-500" />
                         ) : (
                           <CheckCircle className="w-5 h-5 text-green-500" />
                         )}
                         <p className={`font-bold ${item.label === "PNEUMONIA" ? "text-red-600" : "text-green-600"}`}>
                           {item.label === "PNEUMONIA" ? "Pneumonia" : "Normal"}
                         </p>
                       </div>
                       <p className="text-sm text-gray-400">Diagnosis</p>
                     </div>
                     
                     <div className="text-right">
                       <p className="font-bold text-gray-900 text-lg">{Math.round(item.confidence * 100)}%</p>
                       <p className="text-sm text-gray-400">Confidence</p>
                     </div>
                   </div>
                 </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
