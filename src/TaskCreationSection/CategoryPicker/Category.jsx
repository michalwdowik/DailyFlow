/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { IoIosRemoveCircle } from "react-icons/io";
import { v4 as uuid2 } from "uuid";
// import Alert from "../../Components/Alert";
import { colorStyleRadioHandler } from "../../Components/colorStyleClassHandler";
import {
  CategoryParamsContext,
  TaskDetailsContext,
} from "../../Components/Contexts";
import categories, { removeCategory } from "./categories";

export default function Category({
  categoryName,
  onChange,
  color,
  isAddedByUser,
  uuid,
}) {
  const {
    setColorStyle,
    selectedCategoryUUID,
    setSelectedCategoryUUID,
    setSelectedCategoryName,
  } = useContext(CategoryParamsContext);
  const { updateApp, setUpdateApp } = useContext(TaskDetailsContext);

  const uniqueID = uuid2();

  const removeCategoryHandler = () => {
    removeCategory(uuid);
    if (selectedCategoryUUID === uuid) {
      setSelectedCategoryUUID(categories[0].uuid);
      setColorStyle("info");
      setSelectedCategoryName(categories[0].name);
    }
    setUpdateApp(!updateApp);
  };

  return (
    <div className="flex gap-1 p-1 ">
      <input
        id={uniqueID}
        checked={selectedCategoryUUID === uuid}
        onChange={onChange}
        type="radio"
        name="radio-3"
        className={`  radio  ${colorStyleRadioHandler(color)}`}
      />

      <label
        htmlFor={uniqueID}
        className="text-gray-600 transition duration-150 ease-in-out active:text-gray-400"
      >
        {categoryName}
      </label>
      {isAddedByUser && (
        <button
          onClick={removeCategoryHandler}
          type="button"
          className="transition active:scale-125"
        >
          <IoIosRemoveCircle className="text-error opacity-90" />
        </button>
      )}
    </div>
  );
}
