import React, { useEffect } from "react";
import { fetchComments } from "../redux/commentSlice";
import { useDispatch, useSelector } from "react-redux";

const CommentStats = ({ searchURL }) => {
  const videoId = searchURL;
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments.data);
  console.log(comments)

  useEffect(() => {
    if (!videoId) return
    dispatch(fetchComments(videoId));
  }, [videoId, dispatch]);

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
      <h2 className="text-lg font-semibold mb-4">Comment Statistics</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-700 p-4 rounded-lg text-center">
          <p className="text-sm">Total Comments</p>
          <p className="text-xl font-bold">{totalComments}</p>
        </div>
        <div className="bg-green-700 p-4 rounded-lg text-center">
          <p className="text-sm">Agree</p>
          <p className="text-xl font-bold">{sentimentCounts.positive}</p>
        </div>
        <div className="bg-red-700 p-4 rounded-lg text-center">
          <p className="text-sm">Disagree</p>
          <p className="text-xl font-bold">{sentimentCounts.negative}</p>
        </div>
        <div className="bg-blue-700 p-4 rounded-lg text-center">
          <p className="text-sm">Neutral</p>
          <p className="text-xl font-bold">{sentimentCounts.neutral}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentStats;
