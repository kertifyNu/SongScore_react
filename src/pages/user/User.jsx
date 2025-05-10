"use client";
import React, { useState } from "react";
import axios from "axios";
import { Spotify } from "react-spotify-embed";
import Rating from "@mui/material/Rating";
import { styled } from "@mui/system";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CustomButton from "../../components/Button";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
//import { useRouter } from "next/navigation"; // Import the useRouter hook
//const domain = "https://3.7.248.219";
const domain = "http://localhost:3069";

// const [rates, setRates] = React.useState<rate[]>([]);

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
    fontsize: "4rem",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
    fontsize: "4rem",
  },
});

const getAccessToken = async (id) => {
  const { data } = await axios.get(`${domain}/auth/accessToken/${id}`);
  console.log(data);
  return data;
};

const getRandomSongs = async (accessToken, id) => {
  try {
    let song1 = [];
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const body1 = {
      spotifyId: id,
    };
    const response = await axios.post(`${domain}/songs/random`, body1, {
      headers,
    });
    song1[0] = response.data[0];

    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const VerifyUserPage = () => {
  const { id } = useParams(); // Get the id from the URL parameters
  const [accessToken, setAccessToken] = React.useState("");

  const modalRef = React.useRef(null);
  const [songs, setSongs] = React.useState([]);
  const [rates, setRates] = useState([]);
  const [sessionId, setSessionId] = useState("");
  const [link, setLink] = useState("");
  const navigate = useNavigate(); // Initialize the useNavigate hook
  React.useEffect(() => {
    getAccessToken(id).then((data) => {
      setAccessToken(data);
    });
  }, []);

  React.useEffect(() => {
    if (accessToken.accessToken) {
      getRandomSongs(accessToken.accessToken, id).then((data) => {
        setSongs(data);
      });
    }
  }, [accessToken]);
  //set the rating of the song in the rates array
  const setRating = (songId, rating) => {
    const index = rates.findIndex((rate) => rate.songId === songId);
    if (index === -1) {
      setRates([...rates, { songId, rating }]);
    } else {
      const newRates = [...rates];
      newRates[index].rating = rating;
      setRates(newRates);
    }
  };
  const doneHandler = async () => {
    const songs = rates;
    //check if all songs are rated
    if (songs.length !== 5) {
      alert("Please rate all songs");
      return;
    }
    try {
      const data = {
        spotifyId: id,
        songs,
      };
      const config = {
        headers: { Authorization: `Bearer ${accessToken.accessToken}` },
      };

      const resp = await axios.post(`${domain}/songs/rate`, data, config);
      console.log(resp);
      setSessionId(resp.data.sessionId);
      const shareableLink = `${window.location.origin}/guess/${resp.data.sessionId}`;
      setLink(shareableLink);

      console.log("Ratings posted successfully", resp);

      modalRef.current?.showModal();
    } catch (error) {
      console.error("Error posting ratings:", error);
    }
  };
  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    alert("Link copied to clipboard!");
  };
  const closeBtnHandler = () => {
    navigate(`/leaderboard/${sessionId}`);
  };
  return (
    <div className="p-2">
      <div className="text-3xl m-4 font-franie text-green-600 text-center">
        <h1>
          Rate the songs according to
          <span className="text-amber-300"> your </span>
          preference{" "}
        </h1>{" "}
      </div>
      <div className="flex flex-col md:flex-row gap-7 justify-center items-center flex-wrap max-w-[75rem] my-7 mx-auto">
        {songs.map((song) => (
          <div key={song.trackid}>
            <Spotify
              link={"https://open.spotify.com/track/" + song.trackid}
              height="352"
              width="100%"
              frameBorder="1"
              theme="0"
              style={{ borderRadius: "14px" }}
              className="card-title"
            />
            <div className=" py-4 flex justify-center items-start ">
              <StyledRating
                name="customized-color"
                defaultValue={-1}
                getLabelText={(value) =>
                  `${value} Heart${value !== 1 ? "s" : ""}`
                }
                size="large"
                precision={1}
                icon={<FavoriteIcon fontSize="inherit" />}
                emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                onChange={(event, newValue) => {
                  if (newValue !== null) {
                    setRating(song.trackid, newValue);
                  }
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-start mb-10">
        {/* <button
          className="btn btn-outline btn-success w-[7rem]"
          onClick={doneHandler}
        >
          Done
        </button> */}
        <CustomButton
          variant="contained"
          color="success"
          onClick={doneHandler}
          className="w-[7rem] rounded-full "
          // style={{
          //   background: "linear-gradient(to right, #00C853, #3366FF)",
          //   color: "#fff",
          // }}
        >
          Done
        </CustomButton>
      </div>
      <dialog ref={modalRef} className="modal sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            You have successfully rated the songs!!
          </h3>
          <pre className="py-4">here is a shareable link</pre>
          <div className="flex items-center gap-4 text-white ">
            <input
              type="text"
              value={link}
              readOnly
              className="input input-bordered w-full max-w-xs px-2 py-1 rounded"
            />

            <a onClick={copyToClipboard} className="btn">
              <ContentCopyIcon />
            </a>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn" onClick={closeBtnHandler}>
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default VerifyUserPage;
