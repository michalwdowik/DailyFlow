/* eslint-disable no-unused-vars */
import React, { useContext, useReducer } from "react";
import { colorStyleBgHandler } from "../../colorStyleClassHandler";
import AddCategoryModal from "../CategoryCreationSection/AddCategoryModal";
import { CategoryParamsContext } from "../../Contexts";
import categories from "./categories";
import Category from "./Category";

export default function CategoryPicker() {
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const { selectedCategoryName, colorStyle, setCategoryParams } = useContext(
    CategoryParamsContext
  );

  return (
    <div className="flex w-7/12 flex-col sm:w-2/4 md:w-2/4 ">
      <span className="label-text mb-1 text-slate-700">Select category:</span>
      <div className="collapse-arrow collapse rounded-xl bg-transparent">
        <input type="checkbox" className="peer" />
        <div
          className={`customShadow ${colorStyleBgHandler(
            colorStyle
          )} collapse-title rounded-3xl text-primary-content transition duration-150 ease-in-out peer-checked:text-secondary-content peer-checked:opacity-75`}
        >
          {selectedCategoryName}
        </div>
        <div className="collapse-content mt-3 flex flex-row flex-wrap content-center justify-center gap-2 rounded-lg bg-transparent text-primary-content peer-checked:bg-transparent peer-checked:text-secondary-content">
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
