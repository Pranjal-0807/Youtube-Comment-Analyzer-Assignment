import React from "react";
import axios from 'axios';

const Header = ({ searchURL, setSearchURL }) => {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setSearchURL(event.target.value);
    }
  };

  const videoId = searchURL

  const handleDownloadCSV = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/analysis/download-csv`, {
        params: { videoId },
        responseType: 'blob', 
      });

      const blob = new Blob([response.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `comments_analysis_${videoId}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error downloading CSV:', err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
      <h1 className="text-2xl font-bold">Analysis Results</h1>

      <input
        type="search"
        className="bg-white text-black font-semibold px-4 py-2 rounded-lg w-2/3"
        placeholder="Enter Youtube URL"
        onKeyPress={handleKeyPress}
      />

      <button onClick={handleDownloadCSV} className="bg-purple-500 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-lg">
        Export CSV
      </button>
    </div>
  );
};

export default Header;
