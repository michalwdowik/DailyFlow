/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-unreachable */
import React, { useContext } from "react";
import CategoryMenu from "./CategoryMenu";
import { TaskDetailsContext } from "../Contexts/Contexts";

export default function AddedCategoriesMenu() {
  const { groupTaskList } = useContext(TaskDetailsContext);
  const visibleCategories = groupTaskList();
  return (
    <div>
      <ul className="customShadow menu rounded-box menu-horizontal static flex max-w-sm  flex-wrap justify-center gap-0 p-0 sm:max-w-lg md:max-w-lg">
        {visibleCategories.map((task, index) => (
          <CategoryMenu
            categoryLength={visibleCategories[index].categoryLength}
            visibleCategory={visibleCategories[index].category}
            key={index}
            categoryIcon={visibleCategories[index].categoryIcon}
            categoryColorStyle={visibleCategories[index].categoryColorStyle}
            visibleCategories={visibleCategories}
          />
        ))}
      </ul>
    </div>
  );
}
