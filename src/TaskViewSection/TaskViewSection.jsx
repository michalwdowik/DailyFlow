import React, { useContext } from "react";
import { TaskDetailsContext } from "../Contexts/Contexts";
import TaskList from "./TaskList";
import AddedCategoriesTab from "./AddedCategoriesTab/AddedCategoriesTab";

export default function TaskViewSection() {
  const { setTaskList } = useContext(TaskDetailsContext);
  return (
    <div className="customCard flex w-full flex-col gap-7 p-5">
      <AddedCategoriesTab />
      <TaskList setTaskList={setTaskList} />
    </div>
  );
}
