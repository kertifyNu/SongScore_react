import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Spotify } from "react-spotify-embed";
import Rating from "@mui/material/Rating";
import { styled } from "@mui/system";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom"; // React Router hook
import { useParams } from "react-router-dom"; // React Router hook
import Footer from "@/components/Footer"; // Import the Footer component

const domain = import.meta.env.VITE_APP_SERVER_URI || "http://localhost:3069";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
    fontSize: "4rem",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
    fontSize: "4rem",
  },
});

const GuessPage = () => {
  const { id } = useParams(); // Get the id from the URL parameters
  const [name, setName] = useState("");
  const [ratingSession, setRatingSession] = useState(null);
  const [guesses, setGuesses] = useState({
    guesserName: "",
    guesses: [],
  });
  const [accuracyScore, setAccuracyScore] = useState(0);
  const modalRef = useRef(null);
  const navigate = useNavigate();

  const setGuessesHandler = (songId, rating) => {
    const newGuesses = guesses.guesses.filter((g) => g.songId !== songId);
    newGuesses.push({ songId, guess: rating });
    setGuesses({
      guesserName: name,
      guesses: newGuesses,
    });
  };

  const getRating = async (id) => {
    try {
      const response = await axios.get(`${domain}/share/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching rating session:", error);
      return null;
    }
  };

  useEffect(() => {
    getRating(id).then((session) => {
      if (session) {
        setRatingSession(session);
      }
    });
  }, [id]);

  const doneHandler = async () => {
    if (name.trim() === "") {
      alert("Please enter your name");
      return;
    }

    if (guesses.guesses.length !== 5) {
      alert("Please guess all songs.");
      return;
    }

    try {
      const resp = await axios.post(`${domain}/share/${id}/guess`, guesses);
      setAccuracyScore(resp.data.accuracyScore);
      modalRef.current?.showModal();
    } catch (error) {
      console.error("Error posting guess:", error);
    }
  };

  const closeBtnHandler = () => {
    navigate(`/leaderboard/${id}`);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div className="p-2">
          <div className="text-4xl m-4 font-franie text-green-600 text-center">
            <h1>
              Guess how much{" "}
              <span className="text-amber-300">{ratingSession?.name}</span>{" "}
              rated these songs
            </h1>

            <div className="join my-[5rem]">
              <input
                className="namebox input input-bordered join-item"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-7 justify-center items-center flex-wrap max-w-[75rem] my-7 mx-auto">
            {ratingSession?.songs.map((songId) => (
              <div key={songId}>
                <Spotify
                  link={`https://open.spotify.com/track/${songId}`}
                  height="352"
                  width="100%"
                  frameBorder="1"
                  theme="0"
                  style={{ borderRadius: "14px" }}
                  className="card-title"
                />
                <div className="py-4 flex justify-center items-start">
                  <StyledRating
                    name={`rating-${songId}`}
                    defaultValue={-1}
                    getLabelText={(value) =>
                      `${value} Heart${value !== 1 ? "s" : ""}`
                    }
                    size="large"
                    precision={1}
                    icon={<FavoriteIcon fontSize="large" />}
                    emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                    onChange={(event, newValue) => {
                      if (newValue !== null) {
                        setGuessesHandler(songId, newValue);
                      }
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-start mb-10">
            <button
              className="btn btn-outline btn-success w-[7rem]"
              onClick={doneHandler}
            >
              Done
            </button>
          </div>

          <dialog ref={modalRef} className="modal sm:modal-middle">
            <div className="modal-box">
              <h3 className="font-bold text-lg flex items-center justify-center">
                Your score is {accuracyScore} / 50
              </h3>
              <div className="modal-action flex items-center justify-center">
                <form method="dialog">
                  <button className="btn" onClick={closeBtnHandler}>
                    Check Leaderboard
                  </button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
      <Footer className="mt-auto bg-gray-800" bgColor="#2D2D2D" />
    </>
  );
};

export default GuessPage;
