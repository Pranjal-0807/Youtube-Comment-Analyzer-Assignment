import React, { useState } from "react";
import Chart from "./components/Chart";
import Header from "./components/Header";
import CommentStats from "./components/CommentStats";
import SentimentDistribution from "./components/SentimentDistribution";
import TopKeywords from "./components/TopKeywords";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="flex items-center justify-center h-6 w-6">
        <div className="h-6 w-6 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [searchURL, setSearchURL] = useState("");
  const loading = useSelector((state) => state.comments.loading);

  return (
    <>
      {loading && <Loader />}
      <Toaster position="top-right" reverseOrder={false} />
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <Header setSearchURL={setSearchURL} searchURL={searchURL} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <SentimentDistribution />

          <CommentStats searchURL={searchURL} />

          <Chart />

          <TopKeywords />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
