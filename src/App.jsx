/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
import React, { useState, useMemo } from "react";
import TaskCreationSection from "./TaskCreationSection/TaskCreationSection";
import { colorStyleBgHandler } from "./Components/colorStyleClassHandler";
import { TaskDetailsContext } from "./Components/Contexts";
import TaskViewSection from "./TaskViewSection/TaskViewSection";

export default function App() {
  const [updateApp, setUpdateApp] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [selectedTabCategory, setSelectedTabCategory] = useState("all");
  const [colorStyle, setColorStyle] = useState("info");

  const groupTaskList = () => {
    const newList = [...taskList];
    const segregatedList = newList.reduce((group, arr) => {
      const { category } = arr;
      group[category] = group[category] ?? [];
      group[category].push(arr);
      return group;
    }, {});

    let categoryName = "all";
    let categoryLength = 0;
    let categoryIcon = "IoListOutline";
    let categoryColorStyle = "black";
    let categoryUUID = 9532953502;
    const wholeList = [
      { categoryName, categoryLength, categoryIcon, categoryUUID },
    ];

    for (const [key, value] of Object.entries(segregatedList)) {
      categoryName = key;
      categoryLength = value.length;
      categoryIcon = value[0].icon;
      categoryColorStyle = value[0].colorStyle;
      categoryUUID = value[0].uuid;

      for (const property of Object.keys(wholeList)) {
        if (!wholeList[property].category === categoryName) {
          wholeList.push({
            categoryName,
            categoryLength,
            categoryIcon,
            categoryColorStyle,
            categoryUUID,
          });
        }
      }

      wholeList.push({
        categoryName,
        categoryLength,
        categoryIcon,
        categoryColorStyle,
        categoryUUID,
      });
    }
    return wholeList;
  };

  const value = useMemo(
    () => ({
      groupTaskList,
      setTaskList,
      taskList,
      selectedTabCategory,
      setSelectedTabCategory,
      updateApp,
      setUpdateApp,
    }),
    [groupTaskList, taskList, selectedTabCategory, updateApp]
  );

  return (
    <div className="container min-h-screen min-w-full">
      <div className={`shape-blob one  ${colorStyleBgHandler(colorStyle)}`} />
      <div className={`shape-blob  ${colorStyleBgHandler(colorStyle)}`} />
      <div className="m-0 p-0 sm:m-10 lg:flex lg:items-center">
        <div className="grid gap-10 p-10 sm:grid-cols-1 lg:grid-cols-2">
          <TaskDetailsContext.Provider value={value}>
            <TaskCreationSection
              colorStyle={colorStyle}
              setColorStyle={setColorStyle}
            />
            <TaskViewSection />
          </TaskDetailsContext.Provider>
        </div>
      </div>
    </div>
  );
}
