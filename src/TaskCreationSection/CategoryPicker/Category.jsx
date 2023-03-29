/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { IoIosRemoveCircle } from "react-icons/io";
import { v4 as uuid2 } from "uuid";
import { colorStyleRadioHandler } from "../../colorStyleClassHandler";
import { CategoryParamsContext } from "../../Contexts";
import categories, { removeCategory } from "./categories";

export default function Category({
  categoryName,
  color,
  isAddedByUser,
  uuid,
  onChange,
  forceUpdate,
}) {
  const uniqueID = uuid2();
  const {
    setColorStyle,
    selectedCategoryUUID,
    setSelectedCategoryUUID,
    setSelectedCategoryName,
  } = useContext(CategoryParamsContext);

  const removeCategoryHandler = () => {
    forceUpdate();
    removeCategory(uuid);
    if (selectedCategoryUUID === uuid) {
      setSelectedCategoryUUID(categories[0].uuid);
      setColorStyle("info");
      setSelectedCategoryName(categories[0].name);
    }
  };

  return (
    <div className="flex gap-1 p-1 ">
      <input
        id={uniqueID}
        checked={selectedCategoryUUID === uuid}
        onChange={onChange}
        type="radio"
        name="radio-3"
        className={`radio ${colorStyleRadioHandler(color)}`}
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
