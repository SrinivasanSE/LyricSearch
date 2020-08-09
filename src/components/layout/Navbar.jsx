import React, { useContext } from "react";
import { Context } from "../../context";
import * as constants from "../../constants";

const Navbar = (props) => {
  const { dispatch } = useContext(Context);
  const handleClick = (e) => {
    dispatch({
      type: constants.FETCHING_TRACKS_REQUESTED,
    });
  };
  return (
    <nav className="row navbar navbar-dark bg-dark mb-5">
      <span
        onClick={() => {
          window.location.href = "/";
        }}
        className="col-md-4 col-sm-12 ml-0 btn navbar-brand mb-0 h1"
      >
        Lyricfinder
      </span>
      <span className="col-md-6 col-sm-12 btn btn-link" onClick={handleClick}>
        Top 10 Tracks
      </span>
    </nav>
  );
};

export default Navbar;
