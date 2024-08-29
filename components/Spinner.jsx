import { useState, CSSProperties } from "react";
import { PuffLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function Spinner({ loading, size, color }) {
  return (
    <div className="">
      <PuffLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Spinner;
