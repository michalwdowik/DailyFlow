/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { IoListOutline } from "react-icons/io5";
import DynamicIcon from "../../TaskCreationSection/CategoryCreationSection/IconPicker/DynamicIcon";
import { colorStyleBgHandler } from "../../Components/colorStyleClassHandler";
import { TaskDetailsContext } from "../../Components/Contexts";

export default function CategoryTab({ addedCategoryTab, allAddedCategories }) {
  const { selectedTabCategory, setSelectedTabCategory, taskList } =
    useContext(TaskDetailsContext);

  const calculatePadding = () => {
    if (allAddedCategories > 8) {
      return "p-0";
    }
    if (allAddedCategories > 6) {
      return "p-1";
    }
    return "p-2";
  };

  return (
    <li>
      <div
        className={`${calculatePadding()} indicator relative mt-4 bg-base-300 shadow-xl transition delay-150 ease-in-out hover:bg-base-200`}
      >
        <span
          className={`badge badge-sm indicator-item absolute left-5 translate-x-0 border-0 shadow-xl md:badge-md lg:badge-sm ${colorStyleBgHandler(
            addedCategoryTab.categoryColorStyle
          )} text-white ${
            addedCategoryTab.categoryName === selectedTabCategory &&
            "animate-bounce"
          }`}
        >
          {addedCategoryTab.categoryName === "all"
            ? taskList.length
            : addedCategoryTab.categoryLength}
        </span>
        <button
          type="button"
          onClick={() => setSelectedTabCategory(addedCategoryTab.categoryName)}
          className={` ${
            allAddedCategories > 5 ? "text-xs" : "text-xl"
          } delay-50 bg-opacity-100 p-3 text-white transition ease-in-out hover:text-white hover:opacity-60 sm:text-2xl md:text-3xl lg:text-xl 
          ${
            addedCategoryTab.categoryName === selectedTabCategory
              ? " scale-150  "
              : "scale-100"
          }`}
        >
          {addedCategoryTab.categoryName === "all" ? (
            <IoListOutline />
          ) : (
            <DynamicIcon name={`${addedCategoryTab.categoryIcon}`} />
          )}
        </button>
      </div>
    </li>
  );
}
