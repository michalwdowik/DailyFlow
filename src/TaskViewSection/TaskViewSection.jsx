/* eslint-disable import/no-unresolved */
import React, { useContext, useMemo, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { MainContext, ViewSectionContext } from "../Contexts";
import TaskList from "./TaskList";
import AddedCategoriesTab from "./AddedCategoriesTab/AddedCategoriesTab";

export default function TaskViewSection() {
  const [selectedTabCategory, setSelectedTabCategory] = useState("all");
  const { setTaskList } = useContext(MainContext);
  const [parent] = useAutoAnimate();
  const value = useMemo(
    () => ({
      selectedTabCategory,
      setSelectedTabCategory,
    }),
    [selectedTabCategory]
  );

  return (
    <div
      ref={parent}
      className="taskViewSection customCard flex w-full flex-col gap-7  p-0 transition-[100px]"
    >
      <ViewSectionContext.Provider value={value}>
        <AddedCategoriesTab />
        <TaskList setTaskList={setTaskList} />
      </ViewSectionContext.Provider>
    </div>
  );
}
