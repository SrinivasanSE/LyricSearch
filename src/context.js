import React, { useReducer, useEffect } from "react";
import * as constants from "./constants";
import axios from "axios";

const defaultState = {
  track_list: [],
  heading: "",
  loading: true,
  error: "",
  fetching: false,
};
export const Context = React.createContext(defaultState);

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case constants.SEARCH_TRACKS_SUCCESS:
      return {
        ...state,
        track_list: action.payload,
        heading: "Search Results",
        loading: false,
      };
    case constants.SEARCHING:
      return {
        ...state,
        loading: true,
      };
    case constants.SEARCH_TRACKS_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case constants.FETCHING_TRACKS_REQUESTED:
      return {
        ...state,
        fetching: true,
        loading: true,
      };
    case constants.FETCHED_TRACKS:
      return {
        ...state,
        heading: "Top 10 Tracks",
        track_list: action.payload,
        loading: false,
      };
    case constants.FETCHING_TRACKS_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
export const Provider = (props) => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  useEffect(() => {
    console.log("in use effect");
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/${process.env.REACT_APP_root_url}/chart.tracks.get?chart_name=top&page=1&page_size=10&country=in&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then((res) => {
        console.log(res);
        dispatch({
          type: constants.FETCHED_TRACKS,
          payload: res.data.message.body.track_list,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: constants.FETCHING_TRACKS_FAILED,
          payload: err,
        });
      });
  }, [state.fetching]);
  console.log(state);
  return (
    <Context.Provider value={{ state, dispatch }}>
      {props.children}
    </Context.Provider>
  );
};

export const Consumer = Context.Consumer;
