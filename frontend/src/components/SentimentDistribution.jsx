import React from "react";
import { useSelector } from "react-redux";

const SentimentDistribution = () => {
  const comments = useSelector((state) => state.comments.data);

  const sentimentCounts = comments.reduce(
    (acc, comment) => {
      acc[comment.sentiment]++;
      return acc;
    },
    { positive: 0, negative: 0, neutral: 0 }
  );
  const totalComments = comments.length;

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Sentiment Distribution</h2>

      {["positive", "negative", "neutral"].map((label, i) => (
        <div key={label} className="mb-2">
          <div className="flex justify-between text-sm">
            <span>{label.charAt(0).toUpperCase() + label.slice(1)}</span>
            <span>
              {sentimentCounts && totalComments > 0
                ? `${((sentimentCounts[label] / totalComments) * 100).toFixed(1)}%`
                : "0%"}
            </span>
          </div>
          <div className="w-full h-2 bg-gray-700 rounded-full">
            <div
              className={`h-2 rounded-full ${i === 0
                ? "bg-green-500"
                : i === 1
                  ? "bg-red-500"
                  : "bg-blue-500"
                }`}
              style={{
                width: `${(sentimentCounts[label] / totalComments) *
                  100
                  }%`,
              }}
            ></div>
          </div>
        </div>
      ))}

    </div>
  );
};

export default SentimentDistribution;
