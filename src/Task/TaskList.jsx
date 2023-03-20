/* eslint-disable no-restricted-syntax */
/* eslint-disable prettier/prettier */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */

import React, { useContext, useState } from "react";
import Task from "./Task";
import { TaskDetailsContext } from "../Contexts/Contexts";
import SearchBar from "../Components/SearchBar";

export default function TaskList({setTaskList}) {
  const { taskList, groupTaskList, selectedTabCategory } = useContext(TaskDetailsContext);
  const [searchInput, setSearchInput] = useState("");

  const onInput = (e) => {
    setSearchInput(e.target.value);
  }

  const updateStatusHandler = (e, index) => {
    const newList = [...taskList];
    newList[index].done = e.target.checked;
    setTaskList(newList);
  };

  const getColor = () => {
    const visibleCategories = groupTaskList();
    let color;
    for (const category of Object.values(visibleCategories)) {
      if (category.category===selectedTabCategory) {
        color = category.categoryColorStyle
      }
    }
    return color;
  }

  return (
    <div className="w-5/6 pb-5 sm:w-4/6 md:w-1/2 lg:w-5/6">
<SearchBar onInput={onInput} searchInput={searchInput} colorStyle={getColor()}/>

        <div className="flow-root">
          <ul className="p-0">
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
