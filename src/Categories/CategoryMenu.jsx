/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from "react";
import { IoListOutline } from "react-icons/io5";
import DynamicIcon from "../IconPicker/DynamicIcon";
import { colorStyleBgHandler } from "../colorStyleClassHandler";
import { TaskDetailsContext } from "../Contexts/Contexts";

export default function CategoryMenu({
  categoryColorStyle,
  visibleCategory,
  categoryLength,
  categoryIcon,
  visibleCategories,
}) {
  const { selectedTabCategory, setSelectedTabCategory, taskList } =
    useContext(TaskDetailsContext);

  const calculatePadding = () => {
    if (visibleCategories.length > 8) {
      return "p-0";
    }
    if (visibleCategories.length > 6) {
      return "p-1";
    }
    return "p-2";
  };
  return (
    <li>
      <div
        className={`${calculatePadding()} indicator mt-4 bg-base-300 shadow-xl transition delay-150 ease-in-out hover:bg-base-200`}
      >
        <span
          className={`badge badge-sm indicator-item border-0 shadow-xl md:badge-md lg:badge-sm ${colorStyleBgHandler(
            categoryColorStyle
          )} text-white ${
            visibleCategory === selectedTabCategory &&
            "-right-3.5 -top-1 animate-bounce "
          }`}
        >
          {visibleCategory === "all" ? taskList.length : categoryLength}
        </span>
        <button
          type="button"
          onClick={() => setSelectedTabCategory(visibleCategory)}
          className={` ${
            visibleCategories.length > 5 ? "text-xs" : "text-xl"
          } delay-50 bg-opacity-100 p-3 text-white transition ease-in-out hover:text-white hover:opacity-60 sm:text-2xl md:text-3xl lg:text-xl 
          ${
            visibleCategory === selectedTabCategory
              ? " scale-150  "
              : "scale-100"
          }`}
        >
          {visibleCategory === "all" ? (
            <IoListOutline />
          ) : (
            <DynamicIcon name={`${categoryIcon}`} />
          )}
        </button>
      </div>
    </li>
  );
}
