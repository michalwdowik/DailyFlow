import React, { useContext } from "react";
import CategoryTab from "./CategoryTab";
import { MainContext } from "../../Contexts";

export default function AddedCategoriesTab() {
  const { addedCategoriesTab } = useContext(MainContext);
  return (
    <div>
      <ul className="customShadow menu rounded-box menu-horizontal flex max-w-sm flex-wrap justify-center gap-0 p-0 sm:max-w-lg md:max-w-lg">
        {addedCategoriesTab.map((_, index) => (
          <CategoryTab
            key={addedCategoriesTab[index].categoryUUID}
            addedCategoryTab={addedCategoriesTab[index]}
            addedCategoriesTabLength={addedCategoriesTab.length}
          />
        ))}
      </ul>
    </div>
  );
}
