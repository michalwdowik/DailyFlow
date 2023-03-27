/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */

import React, { useContext } from "react";
import Button from "./Button";
import { TaskDetailsContext } from "./Contexts";

export default function ToolbarButtons({ setAlertData }) {
  const { selectedTabCategory, taskList, setTaskList } =
    useContext(TaskDetailsContext);

  const isAnyTaskDone = () => {
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
    isAnyTaskDone()
      ? setAlertData({
          title: "All done tasks has been removed successfully",
          type: "success",
          bg: "bg-success",
          isShowed: true,
        })
      : setAlertData({
          title: "There are no completed tasks to be deleted",
          type: "error",
          bg: "bg-error",
          isShowed: true,
        });
    setTimeout(() => {
      setAlertData({ isShowed: false });
    }, 3000);
  };

  const makeAllTasksDone = () => {
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

  const undoneAllTasks = () => {
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

  return (
    <div className="flex gap-1 self-center ">
      <Button
        toolTipClass="hover:tooltip-error hover:tooltip hover:tooltip-open"
        toolTipText="Remove Done Tasks"
        action={removeTasksHandler}
        className="customShadow btn-error btn-sm btn-circle btn"
        title={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#FFFFFF"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        }
      />
      <Button
        toolTipClass="tooltip hover:tooltip hover:tooltip-open hover:tooltip-success"
        toolTipText="Mark all as done"
        action={makeAllTasksDone}
        className="customShadow btn-success btn-sm btn-circle btn"
        title={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#FFFFFF"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z" />
          </svg>
        }
      />
      <Button
        toolTipClass="tooltip hover:tooltip hover:tooltip-open hover:tooltip-primary"
        toolTipText="Mark all as undone"
        action={undoneAllTasks}
        className="customShadow btn-primary btn-sm btn-circle btn"
        title={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#FFFFFF"
          >
            <path d="M0 0h24v24H0zm0 0h24v24H0V0z" fill="none" />
            <path d="M1.79 12l5.58 5.59L5.96 19 .37 13.41 1.79 12zm.45-7.78L12.9 14.89l-1.28 1.28L7.44 12l-1.41 1.41L11.62 19l2.69-2.69 4.89 4.89 1.41-1.41L3.65 2.81 2.24 4.22zm14.9 9.27L23.62 7 22.2 5.59l-6.48 6.48 1.42 1.42zM17.96 7l-1.41-1.41-3.65 3.66 1.41 1.41L17.96 7z" />
          </svg>
        }
      />
    </div>
  );
}
