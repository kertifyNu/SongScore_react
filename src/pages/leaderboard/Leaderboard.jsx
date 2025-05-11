import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Footer from "@/components/Footer";

const domain = import.meta.env.VITE_APP_SERVER_URI || "http://localhost:3069";

const LeaderboardPage = () => {
  const { id } = useParams();
  const [leads, setLeads] = useState([]);
  const [link, setLink] = useState("");

  useEffect(() => {
    setLink(`${window.location.origin}/guess/${id}`);
  }, [id]);

  useEffect(() => {
    const getLeaderboard = async () => {
      try {
        const response = await axios.get(`${domain}/leaderboard/${id}`);
        setLeads(response.data);
      } catch (error) {
        console.error(error);
        setLeads([]);
      }
    };
    getLeaderboard();
  }, [id]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="p-2 flex-grow">
        <div className="text-4xl m-4 flex items-center justify-center font-franie text-green-600 text-center">
          <h1>Leaderboard</h1>
        </div>

        <div className="flex justify-center items-center">
          <div className="flex items-center gap-4 text-white">
            <input
              type="text"
              value={link}
              readOnly
              className="input input-bordered max-sm:w-[20rem] w-[25rem] px-2 py-1 rounded"
            />
            <button onClick={copyToClipboard} className="btn">
              <ContentCopyIcon />
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-7 justify-center items-center flex-wrap my-7 mx-auto pb-10">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {leads
                  .sort((a, b) => b.accuracyScore - a.accuracyScore)
                  .map((lead, index) => (
                    <tr key={lead.sessionid}>
                      <td>{index + 1}</td>
                      <td>{lead.name}</td>
                      <td>{lead.accuracyScore}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer className="mt-auto bg-gray-800" bgColor="#2D2D2D" />
    </div>
  );
};

export default LeaderboardPage;
