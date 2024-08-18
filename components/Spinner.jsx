import { useState, CSSProperties } from "react";
import { PuffLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function Spinner({ loading }) {
  return (
    <div className="">
      <PuffLoader
        color={"#000000"}
        loading={loading}
        cssOverride={override}
        size={40}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Spinner;
