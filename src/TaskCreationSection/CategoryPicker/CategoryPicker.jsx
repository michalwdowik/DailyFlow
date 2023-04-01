/* eslint-disable no-unused-vars */
import React, { useContext, useReducer, useState, useMemo } from "react";
import { colorStyleBgHandler } from "../../colorStyleClassHandler";
import AddCategoryModal from "../CategoryCreationSection/AddCategoryModal";
import Category from "./Category";
import categories from "./categories";
import { v4 as uuid } from "uuid";

export default function CategoryPicker({ onCategoryChange, colorStyle, selectedCategoryId }) {
  const [categories, setCategories] = useState(defaultCategories);

  const removeCategory = (uuid) => {
    setCategories(categories.filter((category) => !category.isAddedByUser || category.uuid !== uuid))
  }

  const addCategory = (category) => {
    setCategories([...categories, category])
  }

  const selectedCategory = useMemo(() => categories.find(category => category.uuid === selectedCategoryId), [categories, selectedCategoryId])

  return (
    <div className="flex flex-col w-7/12 sm:w-2/4 md:w-2/4 ">
      <span className="mb-1 label-text text-slate-700">Select category:</span>
      <div className="bg-transparent collapse-arrow collapse rounded-xl">
        <input type="checkbox" className="peer" />
        <div
          className={`customShadow ${colorStyleBgHandler(
            colorStyle
          )} collapse-title rounded-3xl text-primary-content transition duration-150 ease-in-out peer-checked:text-secondary-content peer-checked:opacity-75`}
        >
          {selectedCategory?.name}
        </div>
        <div className="flex flex-row flex-wrap content-center justify-center gap-2 mt-3 bg-transparent rounded-lg collapse-content text-primary-content peer-checked:bg-transparent peer-checked:text-secondary-content">
          {categories.map((category) => (
            <Category
              onChange={() => onCategoryChange(category)}
              onRemove={(uuid) => removeCategory(uuid)}
              key={category.uuid}
              categoryName={category.name}
              selectedCategoryUUID={selectedCategoryId}
              color={category.colorStyle}
              isAddedByUser={category.isAddedByUser}
              uuid={category.uuid}
            />
          ))}
          <AddCategoryModal onAddCategory={category => addCategory(category)} />
        </div>
      </div>
    </div>
  );
}


const defaultCategories = [
  {
    name: "general",
    icon: "AiFillWallet",
    colorStyle: "info",
  },
  {
    name: "hobby",
    icon: "AiFillHeart",
    colorStyle: "error",
  },
  {
    name: "activities",
    icon: "BsActivity",
    colorStyle: "success",
  },
  {
    name: "work",
    icon: "MdWork",
    colorStyle: "primary",
  },
  {
    name: "school",
    icon: "IoSchoolSharp",
    colorStyle: "warning",
  },
].map((category) => ({
  ...category,
  uuid: uuid(),
  isAddedByUser: false,
}));
