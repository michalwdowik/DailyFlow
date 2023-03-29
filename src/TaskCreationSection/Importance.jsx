/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useContext, useState } from "react";
import { colorStyleTextHandler } from "../colorStyleClassHandler";
import { CategoryParamsContext } from "../Contexts";

export default function Importance({ rating, setRating }) {
  const [hover, setHover] = useState(0);
  const { colorStyle } = useContext(CategoryParamsContext);

  return (
    <div className="flex items-baseline gap-3 ">
      <span className="label-text text-slate-700">How Important?:</span>
      <div className="star-rating">
        {[...Array(3)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={` p-1
                  transition
                  ease-in-out
                  ${
                    index <= (hover || rating)
                      ? `${colorStyleTextHandler(colorStyle)}`
                      : "on"
                  }`}
              onClick={() => setRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              <span className="star ">&#9733;</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
