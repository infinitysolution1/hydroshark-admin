import React from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

const GROUP_MAX = 5;
const half = Math.ceil(GROUP_MAX / 2);

export default function Pagination({ page, count, onChange }) {
  const getButton = (current) => (
    <button
      key={current}
      variant={`${page === current ? "secondary" : "ghost"}`}
      className={`py-1 px-3 mx-1 ${
        page === current ? " bg-black/60 text-white rounded-md " : "text-black"
      }`}
      onClick={() => onChange(current)}
    >
      {current}
    </button>
  );

  return (
    <div className="mx-auto w-[20vw] flex flex-row justify-center text-black ">
      {count > 1 && (
        <button
          variant="ghost"
          disabled={page === 1}
          onClick={() => page > 1 && onChange(page - 1)}
          className=" px-2 bg-black text-white rounded-md"
        >
          <FaAngleLeft />
        </button>
      )}

      {count <= GROUP_MAX + 2 ? (
        Array(count)
          .fill(0)
          .map((item, index) => getButton(index + 1))
      ) : (
        <>
          {getButton(1)}
          {page > 1 + half && <span className=" leading-10">...</span>}
          {Array(GROUP_MAX)
            .fill(0)
            .map((item, index) => {
              const p = page - half + index + 1;
              return p > 1 && p < count ? getButton(p) : "";
            })}
          {page < count - half && <span className=" leading-10">...</span>}
          {getButton(count)}
        </>
      )}

      {count > 1 && (
        <button
          variant="ghost"
          disabled={page === count}
          onClick={() => page < count && onChange(page + 1)}
          className=" px-2 bg-black text-white rounded-md"
        >
          <FaAngleRight />
        </button>
      )}
    </div>
  );
}
