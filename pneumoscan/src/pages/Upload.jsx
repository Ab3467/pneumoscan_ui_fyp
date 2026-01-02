import UploadBox from "../components/UploadBox";
import { motion } from "framer-motion";

export default function Upload() {
  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-50 flex flex-col items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Upload Chest X-Ray
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Please upload a clear chest X-ray image for analysis. Supported
            formats include JPEG, PNG, and DICOM.
          </p>
        </motion.div>

        <UploadBox />
        
        <div className="mt-12 text-center">
            <p className="text-sm text-gray-400">
                Disclaimer: This tool is for educational and assistive purposes only. <br/>
                Always consult a medical professional for diagnosis.
            </p>
        </div>
      </div>
    </div>
  );
}
