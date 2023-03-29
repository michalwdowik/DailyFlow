/* eslint-disable no-unused-vars */
import React, { useContext, useReducer } from "react";
import { colorStyleBgHandler } from "../../colorStyleClassHandler";
import AddCategoryModal from "../CategoryCreationSection/AddCategoryModal";
import { CategoryParamsContext } from "../../Contexts";
import Category from "./Category";
import categories from "./categories";

export default function CategoryPicker() {
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const { selectedCategoryName, colorStyle, setCategoryParams } = useContext(
    CategoryParamsContext
  );

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
          {selectedCategoryName}
        </div>
        <div className="flex flex-row flex-wrap content-center justify-center gap-2 mt-3 bg-transparent rounded-lg collapse-content text-primary-content peer-checked:bg-transparent peer-checked:text-secondary-content">
          {categories.map((category) => (
            <Category
              onChange={() => setCategoryParams(category)}
              key={category.uuid}
              categoryName={category.name}
              color={category.colorStyle}
              isAddedByUser={category.isAddedByUser}
              uuid={category.uuid}
              forceUpdate={forceUpdate}
            />
          ))}
          <AddCategoryModal forceUpdate={forceUpdate} />
        </div>
      </div>
    </div>
  );
}
