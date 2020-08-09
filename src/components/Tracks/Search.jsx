import React, { useState, useContext } from "react";
import { Context } from "../../context";
import axios from "axios";
import * as constants from "../../constants";
const Search = (props) => {
  const [trackTitle, setTrackTitle] = useState("");
  const [submitText, setSubmitText] = useState("Get Tracks");
  const { dispatch } = useContext(Context);

  const handleInput = (e) => {
    setTrackTitle(e.target.value);
  };

  const findTrack = (e) => {
    setSubmitText("Getting tracks...");
    e.preventDefault();
    dispatch({
      type: constants.SEARCHING,
    });
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: constants.SEARCH_TRACKS_SUCCESS,
          payload: res.data.message.body.track_list,
        });
        setSubmitText("Get Tracks");
      })
      .catch((err) => {
        dispatch({
          type: constants.SEARCH_TRACKS_FAILED,
          payload: err,
        });
      });
  };

  return (
    <div className="card card-body mb-4 p-4">
      <h1 className="display-4 text-center">
        <i className="fas fa-music"></i>Search For A Song
      </h1>
      <p className="lead text-center">Get the lyrics of any song</p>
      <form onSubmit={findTrack}>
        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            value={trackTitle}
            placeholder="Enter the song title"
            onChange={handleInput}
          />
        </div>
        <button
          className="btn btn-primary btn-lg btn-block mb-5"
          type="submit"
          disabled={!trackTitle || submitText === "Getting tracks..."}
        >
          {submitText}
        </button>
      </form>
    </div>
  );
};

export default Search;
