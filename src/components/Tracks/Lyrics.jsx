import React, { useState, useEffect } from "react";
import axios from "axios";
import { css } from "@emotion/core";
import { ClimbingBoxLoader } from "react-spinners";
import { Link } from "react-router-dom";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
const Lyrics = (props) => {
  const [tracks, setTracks] = useState({});
  const [lyrics, setLyrics] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then((res) => {
        console.log(res.data);
        setLyrics({ lyric: res.data.message.body.lyrics });
        return axios.get(
          `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?track_id=${props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`
        );
      })
      .then((res) => {
        console.log(res.data.message.body.track);
        setTracks({ track: res.data.message.body.track });
        setLoading(false);
      })
      .catch((err) => setError(err))
      .catch((err) => setError(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { track } = tracks;
  const { lyric } = lyrics;
  return (
    <div>
      {loading ? (
        <ClimbingBoxLoader css={override} color={"#123abc"} loading={loading} />
      ) : !error ? (
        <>
          <Link to="/" className="btn btn-dark btn-sm mb-4">
            Go Back
          </Link>
          <div className="card ">
            <h5 className="card-header text-nowrap">
              {track.track_name} by{" "}
              <span className="text-secondary">{track.artist_name}</span>
            </h5>
            <h6 className="card-subtitle mt-1 ml-md-4 text-muted text-center text-md-left">
              Song Lyrics
            </h6>

            <div className="card-body">
              <p className="card-text text-justify">
                {lyric.lyrics_body ? (
                  lyric.lyrics_body
                    .replace(
                      "This Lyrics is NOT for Commercial use",
                      "line repeats"
                    )
                    .replace("(1409620469697)", "")
                ) : (
                  <div class="text-primary mx-auto">
                    Sorry! Lyrics not available for this song. Checkout other
                    songs!
                  </div>
                )}
              </p>
            </div>
          </div>
          <div className="text-primary mt-1 text-center text-md-left">
            Track Details
          </div>
          <ul className="list-group mt-2 mb-5">
            <li className="list-group-item">
              <strong>Album Id</strong>: {track.album_id}
            </li>
            <li className="list-group-item">
              <strong>Song Genre</strong>:{" "}
              {track.primary_genres.music_genre_list[0] ? (
                track.primary_genres.music_genre_list[0].music_genre
                  .music_genre_name
              ) : (
                <span>Genre Not available</span>
              )}
            </li>
            <li className="list-group-item">
              <strong>Explicit</strong>: {track.explict === 0 ? "No" : "Yes"}
            </li>
            <li className="list-group-item">
              <strong>No of Favourites</strong>:
              <span className="badge badge-pill badge-primary ml-1">
                {track.num_favourite}
              </span>
            </li>
          </ul>
        </>
      ) : (
        <>
          <Link to="/" className="btn btn-dark btn-sm mb-4">
            Go Back
          </Link>
          <div class="text-primary text-center">Some error occured</div>
        </>
      )}
    </div>
  );
};

export default Lyrics;
