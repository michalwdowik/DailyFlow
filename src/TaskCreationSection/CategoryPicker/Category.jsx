/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { IoIosRemoveCircle } from "react-icons/io";
import { v4 as uuid2 } from "uuid";
import { colorStyleRadioHandler } from "../../colorStyleClassHandler";
import categories, { removeCategory } from "./categories";

export default function Category({
  categoryName,
  color,
  isAddedByUser,
  selectedCategoryUUID,
  uuid,
  onChange,
  onRemove,
}) {
  const uniqueID = uuid2();

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
          onClick={() => onRemove(uuid)}
          type="button"
          className="transition active:scale-125"
        >
          <IoIosRemoveCircle className="text-error opacity-90" />
        </button>
      )}
    </div>
  );
}
