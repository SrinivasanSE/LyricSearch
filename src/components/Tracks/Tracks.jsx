import React, { useContext } from "react";
import { css } from "@emotion/core";
import { BarLoader } from "react-spinners";
import Track from "./Track";
import { Context } from "../../context";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
const Tracks = () => {
  const data = useContext(Context);
  const {
    state: { track_list, heading, loading, error },
  } = data;

  return (
    <>
      {loading ? (
        <BarLoader
          css={override}
          size={150}
          color={"#123abc"}
          loading={loading}
        />
      ) : !error && track_list ? (
        <>
          <h3 className="text-center mb-4">{heading}</h3>
          <div className="row">
            {track_list.length > 0 ? (
              track_list.map((item) => (
                <Track key={item.track.track_id} track={item.track} />
              ))
            ) : (
              <span className="mx-auto">No Results found for your search!</span>
            )}
          </div>
        </>
      ) : (
        <>
          <h3 className="text-center mb-4">
            Sorry! Some error occured. Please try again
          </h3>
        </>
      )}
    </>
  );
};

export default Tracks;
