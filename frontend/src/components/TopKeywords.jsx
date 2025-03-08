import React from "react";
import { useSelector } from "react-redux";

const TopKeywords = () => {
  const comments = useSelector((state) => state.comments.data);

  const keywordCount = comments
    .flatMap(comment => comment.keywords)
    .reduce((acc, keyword) => ((acc[keyword] = (acc[keyword] || 0) + 1), acc), {});

  const randomKeywordCount = Math.floor(Math.random() * 11) + 10;

  const topKeywords = Object.entries(keywordCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, randomKeywordCount)
    .map(([keyword]) => keyword);


  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Top Keywords</h2>
      <div className="flex flex-wrap gap-2">
        {topKeywords.map((word, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-700 rounded-full text-sm"
          >
            {word ? word.charAt(0).toUpperCase() + word.slice(1) : ""}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TopKeywords;
