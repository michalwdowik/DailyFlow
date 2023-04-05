/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { colorStyleTextHandler } from "../colorStyleClassHandler";

export default function Importance({ rate, setRate, colorStyle }) {
  const [hover, setHover] = useState(0);

  const colorStar = (index) => {
    return index <= (hover || rate)
      ? `${colorStyleTextHandler(colorStyle)}`
      : "on";
  };
  function Star({ index }) {
    return (
      <button
        type="button"
        key={index}
        className={` p-1
        transition
        ease-in-out
        ${colorStar(index)}`}
        onClick={() => setRate(index)}
        onMouseEnter={() => setHover(index)}
        onMouseLeave={() => setHover(rate)}
      >
        <span className="star ">&#9733;</span>
      </button>
    );
  }
  return (
    <div className="flex items-baseline gap-3 ">
      <span className="label-text text-slate-700">How Important?:</span>
      <div className="star-rating">
        {[...Array(3)].map((star, index) => {
          index += 1;
          return <Star index={index} />;
        })}
      </div>
    </div>
  );
}
