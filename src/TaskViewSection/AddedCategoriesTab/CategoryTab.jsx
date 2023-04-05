/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { IoListOutline } from "react-icons/io5";
import {
  colorStyleBgHandler,
  colorStyleTooltipHandler,
} from "../../colorStyleClassHandler";
import { MainContext, ViewSectionContext } from "../../Contexts";
import DynamicIcon from "../../TaskCreationSection/CategoryCreationSection/IconPicker/DynamicIcon";

export default function CategoryTab({
  addedCategoryTab,
  addedCategoriesTabLength,
}) {
  const { selectedTabCategory, setSelectedTabCategory } =
    useContext(ViewSectionContext);
  const { taskList } = useContext(MainContext);

  function scaleActiveTab() {
    return addedCategoryTab.categoryName === selectedTabCategory
      ? " scale-150 "
      : "scale-100";
  }

  function validIconSize() {
    return addedCategoriesTabLength > 5 ? "text-xs" : "text-xl";
  }

  const calculatePadding = () => {
    if (addedCategoriesTabLength > 8) {
      return "p-0";
    }
    if (addedCategoriesTabLength > 6) {
      return "p-1";
    }
    return "p-2";
  };

  const categoryLength = () => {
    return addedCategoryTab.categoryName === "all"
      ? taskList.length
      : addedCategoryTab.categoryLength;
  };

  const animateIndicatorOnActiveTab = () => {
    return (
      addedCategoryTab.categoryName === selectedTabCategory && "animate-bounce"
    );
  };

  function TabIndicator({ color }) {
    return (
      <span
        className={`badge badge-sm indicator-item absolute left-5 translate-x-0 border-0 shadow-xl md:badge-md lg:badge-sm ${colorStyleBgHandler(
          color
        )} text-white ${animateIndicatorOnActiveTab()}`}
      >
        {categoryLength()}
      </span>
    );
  }

  function TabIcon({ categoryName, iconName }) {
    return categoryName === "all" ? (
      <IoListOutline />
    ) : (
      <DynamicIcon name={iconName} />
    );
  }
  function Tab({ color, name }) {
    return (
      <div
        className={`tooltip tooltip-bottom ${colorStyleTooltipHandler(color)}`}
        data-tip={name}
      >
        <button
          type="button"
          onClick={() => setSelectedTabCategory(name)}
          className={` ${validIconSize()} delay-50 bg-opacity-100 p-3 text-white transition ease-in-out hover:text-white hover:opacity-60 sm:text-2xl md:text-3xl lg:text-xl 
          ${scaleActiveTab()}`}
        >
          <TabIcon
            categoryName={addedCategoryTab.categoryName}
            iconName={addedCategoryTab.categoryIcon}
          />
        </button>
      </div>
    );
  }

  return (
    <li>
      <div
        className={`${calculatePadding()} indicator relative mt-4 bg-base-300 shadow-xl transition delay-150 ease-in-out hover:bg-base-200`}
      >
        <TabIndicator color={addedCategoryTab.categoryColorStyle} />
        <Tab
          color={addedCategoryTab.categoryColorStyle}
          name={addedCategoryTab.categoryName}
        />
      </div>
    </li>
  );
}
