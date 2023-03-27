/* eslint-disable react/prop-types */
import React, { useContext, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Task from "./Task";
import { TaskDetailsContext } from "../Components/Contexts";
import SearchBar from "../Components/ToolBar";
import ToolBar from "../Components/ToolBar";

export default function TaskList({ setTaskList }) {
  const { taskList, groupTaskList, selectedTabCategory } =
    useContext(TaskDetailsContext);
  const [searchInput, setSearchInput] = useState("");
  const [animationParent] = useAutoAnimate({
    duration: 100,
    easing: "ease-in-out",
    disrespectUserMotionPreference: false,
  });
  const onInput = (e) => {
    setSearchInput(e.target.value);
  };

  const updateStatusHandler = (e, index) => {
    const newList = [...taskList];
    newList[index].done = e.target.checked;
    setTaskList(newList);
  };

  const getColor = () => {
    const visibleCategories = groupTaskList();
    let color;
    for (const category of Object.values(visibleCategories)) {
      if (category.category === selectedTabCategory) {
        color = category.categoryColorStyle;
      }
    }
    return color;
  };

  return (
    <div className="w-5/6 pb-5 sm:w-4/6 md:w-1/2 lg:w-5/6">
      <ToolBar
        onInput={onInput}
        searchInput={searchInput}
        colorStyle={getColor()}
      />

      <div className="flow-root ">
        <ul
          ref={animationParent}
          className={`mt-3 max-h-[550px] ${
            taskList.length > 8 && "overflow-y-scroll"
          } p-0`}
        >
          {taskList.length === 0 && (
            <h1 className="transition-color mt-10 animate-pulse text-center text-3xl opacity-70 duration-500 hover:text-success">
              Add some tasks!
            </h1>
          )}
          {taskList.map((task, index) => (
            <Task
              searchInput={searchInput}
              key={index}
              index={index}
              onChange={(e) => updateStatusHandler(e, index)}
              task={task}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
