/* eslint-disable import/no-unresolved */
import React, { useContext } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { TaskDetailsContext } from "../Components/Contexts";
import TaskList from "./TaskList";
import AddedCategoriesTab from "./AddedCategoriesTab/AddedCategoriesTab";

export default function TaskViewSection() {
  const [parent] = useAutoAnimate();
  const { setTaskList } = useContext(TaskDetailsContext);
  return (
    <div
      ref={parent}
      className="taskViewSection customCard flex w-full flex-col gap-7  p-0 transition-[100px]"
    >
      <AddedCategoriesTab />
      <TaskList setTaskList={setTaskList} />
    </div>
  );
}
