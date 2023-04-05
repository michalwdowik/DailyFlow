/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useMemo, useState } from "react";
import { colorStyleBgHandler } from "../../colorStyleClassHandler";
import AddCategoryModal from "../CategoryCreationSection/AddCategoryModal";
import Category from "./Category";
import defaultCategories from "./defaultCategories";

export default function CategoryPicker({
  colorStyle,
  selectedCategoryName,
  onChangeCategory,
}) {
  const [categories, setCategories] = useState(defaultCategories);
  const removeCategory = (uuid) => {
    setCategories(
      categories.filter(
        (category) => !category.isAddedByUser || category.uuid !== uuid
      )
    );
  };
  const addCategory = (category) => {
    setCategories([...categories, category]);
  };

  const selectedCategory = useMemo(
    () => categories.find((category) => category.name === selectedCategoryName),
    [categories, selectedCategoryName]
  );

  //
  function CategoryDropdownMenu({ pickedCategory, color }) {
    return (
      <div
        className={`customShadow ${colorStyleBgHandler(
          color
        )} collapse-title rounded-3xl text-primary-content transition duration-150 ease-in-out peer-checked:text-secondary-content peer-checked:opacity-75`}
      >
        {pickedCategory}
      </div>
    );
  }

  return (
    <div className="flex flex-col w-7/12 sm:w-2/4 md:w-2/4 ">
      <span className="mb-1 label-text text-slate-700">Select category:</span>
      <div className="bg-transparent collapse-arrow collapse rounded-xl">
        <input type="checkbox" className="peer" />
        <CategoryDropdownMenu
          pickedCategory={selectedCategoryName}
          color={colorStyle}
        />
        <div className="flex flex-row flex-wrap content-center justify-center gap-2 mt-3 bg-transparent rounded-lg collapse-content text-primary-content peer-checked:bg-transparent peer-checked:text-secondary-content">
          {categories.map((category) => (
            <Category
              onChange={() => onChangeCategory(category)}
              key={category.uuid}
              categoryName={category.name}
              color={category.colorStyle}
              isAddedByUser={category.isAddedByUser}
              uuid={category.uuid}
              removeCategory={removeCategory}
              selectedCategoryUUID={selectedCategory.uuid}
            />
          ))}
          <AddCategoryModal
            addCategory={(category) => addCategory(category)}
            categories={categories}
          />
        </div>
      </div>
    </div>
  );
}
