import { Github, Twitter, Linkedin, Activity } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <Activity className="text-white h-5 w-5" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                PneumoScan
              </span>
            </div>
            <p className="text-gray-500 max-w-xs leading-relaxed">
              Empowering healthcare with AI-driven pneumonia detection for faster,
              more accurate diagnoses.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-600">
              <li><a href="/" className="hover:text-blue-600 transition-colors">Home</a></li>
              <li><a href="/#about" className="hover:text-blue-600 transition-colors">About Us</a></li>
              <li><a href="/upload" className="hover:text-blue-600 transition-colors">Start Diagnosis</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-600">
              <li>fyp.group@university.edu</li>
              <li>+1 (234) 567-890</li>
              <li className="flex gap-4 mt-4">
                <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors"><Github size={20} /></a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors"><Twitter size={20} /></a>
                <a href="#" className="text-gray-400 hover:text-blue-700 transition-colors"><Linkedin size={20} /></a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} PneumoScan FYP Group. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
