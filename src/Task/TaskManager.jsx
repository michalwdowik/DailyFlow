import React, { useContext } from "react";
import AddedCategoriesMenu from "../Categories/AddedCategoriesMenu";
import { TaskDetailsContext } from "../Contexts/Contexts";
import TaskList from "./TaskList";

export default function TaskManager() {
  const { setTaskList } = useContext(TaskDetailsContext);
  return (
    <div className="customCard flex w-full flex-col gap-7 p-5">
      {console.log("task manager rerendered")}
      <AddedCategoriesMenu />
      <TaskList setTaskList={setTaskList} />
    </div>
  );
}
