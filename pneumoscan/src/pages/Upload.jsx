// Member 2
// Upload.jsx: X-ray upload page

import UploadBox from "../components/UploadBox";

export default function Upload() {
  return (
    <div className="py-20">
      <h2 className="text-3xl font-bold text-center mb-8">
        Upload Chest X-ray
      </h2>

      <UploadBox />
    </div>
  );
}