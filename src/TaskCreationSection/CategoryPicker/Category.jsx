/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
import React from "react";
import { IoIosRemoveCircle } from "react-icons/io";
import { colorStyleRadioHandler } from "../../colorStyleClassHandler";

export default function Category({
  selectedCategoryUUID,
  categoryName,
  color,
  isAddedByUser,
  uuid,
  onChange,
  removeCategory,
}) {
  const removeCategoryHandler = () => {
    removeCategory(uuid);
  };

  function CategoryRadio({ checked, action, radioColor }) {
    return (
      <input
        id={uuid}
        checked={checked}
        onChange={action}
        type="radio"
        name="radio-3"
        className={`radio ${radioColor}`}
      />
    );
  }

  function CategoryLabel({ name }) {
    return (
      <label
        htmlFor={uuid}
        className="text-gray-600 transition duration-150 ease-in-out active:text-gray-400"
      >
        {name}
      </label>
    );
  }

  function RemoveCategoryButton({ action }) {
    return (
      <button
        onClick={action}
        type="button"
        className="transition active:scale-125"
      >
        <IoIosRemoveCircle className="text-error opacity-90" />
      </button>
    );
  }
  return (
    <div className="flex gap-1 p-1 ">
      <CategoryRadio
        checked={selectedCategoryUUID === uuid}
        action={onChange}
        radioColor={colorStyleRadioHandler(color)}
      />
      <CategoryLabel name={categoryName} />
      {isAddedByUser && <RemoveCategoryButton action={removeCategoryHandler} />}
    </div>
  );
}
