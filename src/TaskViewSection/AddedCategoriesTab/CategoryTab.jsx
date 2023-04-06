/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { IoListOutline } from "react-icons/io5";
import {
  colorStyleBgHandler,
  colorStyleTooltipHandler,
} from "../../colorStyleClassHandler";
import { MainContext, ViewSectionContext } from "../../Contexts";
import { DynamicIcon } from "../../TaskCreationSection/CategoryCreationSection/IconPicker";

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

  return (
    <li>
      <div
        className={`${calculatePadding()} indicator relative mt-4 bg-base-300 shadow-xl transition delay-150 ease-in-out hover:bg-base-200`}
      >
        <TabIndicator
          color={addedCategoryTab.categoryColorStyle}
          categoryLength={categoryLength}
          animate={animateIndicatorOnActiveTab()}
        />
        <Tab
          color={addedCategoryTab.categoryColorStyle}
          name={addedCategoryTab.categoryName}
          scaleActiveTab={scaleActiveTab()}
          validIconSize={validIconSize()}
          setSelectedTabCategory={setSelectedTabCategory}
          icon={addedCategoryTab.categoryIcon}
        />
      </div>
    </li>
  );
}

function TabIndicator({ color, categoryLength, animate }) {
  return (
    <span
      className={`badge badge-sm indicator-item absolute left-5 translate-x-0 border-0 shadow-xl md:badge-md lg:badge-sm ${colorStyleBgHandler(
        color
      )} text-white ${animate}`}
    >
      {categoryLength()}
    </span>
  );
}

function TabIcon({ iconName, categoryName }) {
  return categoryName === "all" ? (
    <IoListOutline />
  ) : (
    <DynamicIcon name={iconName} />
  );
}
function Tab({
  color,
  name,
  scaleActiveTab,
  validIconSize,
  setSelectedTabCategory,
  icon,
}) {
  return (
    <div
      className={`tooltip tooltip-bottom ${colorStyleTooltipHandler(color)}`}
      data-tip={name}
    >
      <button
        type="button"
        onClick={() => setSelectedTabCategory(name)}
        className={` ${validIconSize} delay-50 bg-opacity-100 p-3 text-white transition ease-in-out hover:text-white hover:opacity-60 sm:text-2xl md:text-3xl lg:text-xl 
        ${scaleActiveTab}`}
      >
        <TabIcon categoryName={name} iconName={icon} />
      </button>
    </div>
  );
}
