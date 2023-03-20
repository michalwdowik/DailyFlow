import React, { useContext } from "react";
import CategoryTab from "./CategoryTab";
import { TaskDetailsContext } from "../Contexts/Contexts";

export default function AddedCategoriesTab() {
  const { groupTaskList } = useContext(TaskDetailsContext);
  const addedCategories = groupTaskList();
  return (
    <div>
      <ul className="customShadow menu rounded-box menu-horizontal flex max-w-sm flex-wrap justify-center gap-0 p-0 sm:max-w-lg md:max-w-lg">
        {addedCategories.map((_, index) => (
          <CategoryTab
            key={addedCategories[index].categoryUUID}
            addedCategoryTab={addedCategories[index]}
            allAddedCategories={addedCategories.length}
          />
        ))}
      </ul>
    </div>
  );
}
