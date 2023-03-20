/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-expressions */
import React, { useMemo, useState } from "react";
import Form from "./Form";
import { colorStyleBgHandler } from "./colorStyleClassHandler";
import AlertHandler from "./Components/AlertHandler";
import { AlertContext, TaskDetailsContext } from "./Contexts/Contexts";
import TaskManager from "./Task/TaskManager";

export default function App() {
  const [isRemovedAlertVisible, setIsRemovedAlertVisible] = useState(false);
  const [isNotRemovedAlertVisible, setIsNotRemovedAlertVisible] =
    useState(false);
  const [isCategoryAddedAlertVisible, setIsCategoryAddedAlertVisible] =
    useState(false);
  const [isCategoryRemovedAlertVisible, setIsCategoryRemovedAlertVisible] =
    useState(false);
  const [isReachedMaxAlertVisible, setIsReachedMaxAlertVisible] =
    useState(false);

  const [taskList, setTaskList] = useState([]);
  const [selectedTabCategory, setSelectedTabCategory] = useState("all");
  const [colorStyle, setColorStyle] = useState("info");

  const isAnyDone = () => {
    const newList = [...taskList];
    const doneTasks = newList.filter((item) => item.done === true);
    for (const key of taskList) {
      if (selectedTabCategory === "all" && doneTasks.length >= 1) {
        setTaskList(newList.filter((item) => item.done !== true));
        return true;
      }

      if (key.category === selectedTabCategory && key.done === true) {
        setTaskList(newList.filter((item) => item.done !== true));
        return true;
      }
    }
    return false;
  };

  const removeTasksHandler = () => {
    isAnyDone()
      ? setIsRemovedAlertVisible(true)
      : setIsNotRemovedAlertVisible(true);

    setTimeout(() => {
      setIsRemovedAlertVisible(false);
      setIsNotRemovedAlertVisible(false);
    }, 3000);
  };

  const markAllAsDone = () => {
    const newList = [...taskList];
    newList.forEach((task) => {
      if (
        task.category === selectedTabCategory ||
        selectedTabCategory === "all"
      ) {
        task.done = true;
      }
    });
    setTaskList(newList);
  };
  const markAllAsUndone = () => {
    const newList = [...taskList];
    newList.forEach((task) => {
      if (
        task.category === selectedTabCategory ||
        selectedTabCategory === "all"
      ) {
        task.done = false;
      }
    });
    setTaskList(newList);
  };

  const groupTaskList = () => {
    const newList = [...taskList];
    const segregatedList = newList.reduce((group, arr) => {
      const { category } = arr;
      group[category] = group[category] ?? [];
      group[category].push(arr);
      return group;
    }, {});
    let category = "all";
    let categoryLength = 0;
    let categoryIcon = "IoListOutline";
    let categoryColorStyle = "black";
    const wholeList = [{ category, categoryLength, categoryIcon }];

    for (const [key, value] of Object.entries(segregatedList)) {
      category = key;
      categoryLength = value.length;
      categoryIcon = value[0].icon;
      categoryColorStyle = value[0].colorStyle;

      for (const property of Object.keys(wholeList)) {
        if (!wholeList[property].category === category) {
          wholeList.push({
            category,
            categoryLength,
            categoryIcon,
            categoryColorStyle,
          });
        }
      }

      wholeList.push({
        category,
        categoryLength,
        categoryIcon,
        categoryColorStyle,
      });
    }
    return wholeList;
  };

  const taskManager = useMemo(() => <TaskManager />, [taskList]);
  const form = useMemo(
    () => <Form colorStyle={colorStyle} setColorStyle={setColorStyle} />,
    [colorStyle]
  );

  const values = useMemo(
    () => ({
      isRemovedAlertVisible,
      setIsRemovedAlertVisible,
      isNotRemovedAlertVisible,
      setIsNotRemovedAlertVisible,
      isCategoryAddedAlertVisible,
      setIsCategoryAddedAlertVisible,
      isCategoryRemovedAlertVisible,
      setIsCategoryRemovedAlertVisible,
      isReachedMaxAlertVisible,
      setIsReachedMaxAlertVisible,
    }),
    [taskList]
  );

  return (
    <div className="container min-h-screen min-w-full">
      <div className={`shape-blob one  ${colorStyleBgHandler(colorStyle)}`} />
      <div className={`shape-blob  ${colorStyleBgHandler(colorStyle)}`} />
      <AlertContext.Provider
        value={{
          isRemovedAlertVisible,
          setIsRemovedAlertVisible,
          isNotRemovedAlertVisible,
          setIsNotRemovedAlertVisible,
          isCategoryAddedAlertVisible,
          setIsCategoryAddedAlertVisible,
          isCategoryRemovedAlertVisible,
          setIsCategoryRemovedAlertVisible,
          isReachedMaxAlertVisible,
          setIsReachedMaxAlertVisible,
        }}
      >
        <AlertHandler />

        <div className="m-0 p-0 sm:m-10 lg:flex lg:items-center">
          <div className="grid gap-10 p-10 sm:grid-cols-1 lg:grid-cols-2">
            <TaskDetailsContext.Provider
              value={{
                setTaskList,
                selectedTabCategory,
                setSelectedTabCategory,
                taskList,
                groupTaskList,
                removeTasksHandler,
                markAllAsDone,
                markAllAsUndone,
              }}
            >
              {form}
              {taskManager}
            </TaskDetailsContext.Provider>
          </div>
        </div>
      </AlertContext.Provider>
    </div>
  );
}
