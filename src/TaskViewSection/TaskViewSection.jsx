/* eslint-disable import/no-unresolved */
import React, { useMemo, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { ViewSectionContext } from "../Contexts";
import TaskList from "./TaskList";
import AddedCategoriesTab from "./AddedCategoriesTab/AddedCategoriesTab";

export default function TaskViewSection() {
  const [parent] = useAutoAnimate();
  const [selectedTabCategory, setSelectedTabCategory] = useState("all");
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
      className=" glassmorphismCard flex w-full flex-col gap-7 p-0 transition-[100px] "
    >
      <ViewSectionContext.Provider value={value}>
        <AddedCategoriesTab />
        <TaskList />
      </ViewSectionContext.Provider>
    </div>
  );
}
