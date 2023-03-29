/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import TaskDetailsModal from "./TaskDetailsModal";
import { colorStyleCheckboxHandler } from "../colorStyleClassHandler";
import { ViewSectionContext } from "../Contexts";

export default function Task({ task, onChange, index, searchInput }) {
  const { selectedTabCategory } = useContext(ViewSectionContext);
  const renderTask = () => (
    <label>
      <li className="py-1 mx-3 border-b border-solid border-slate-200 sm:py-3">
        <div className="flex items-center space-x-4 ">
          <input
            className={`${colorStyleCheckboxHandler(
              task.colorStyle
            )} checkbox `}
            id={index}
            type="checkbox"
            onChange={onChange}
            checked={task.done}
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate transition transition-delay-50 text-slate-700 hover:text-gray-400">
              {task.name}
            </p>
            <p className="text-sm text-gray-500 truncate ">{task.category}</p>
          </div>

          <div className="inline-flex items-center text-base font-semibold text-slate-700 ">
            {[...Array(task.rate)].map((e, i) => (
              <span key={i}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            ))}
          </div>

          <TaskDetailsModal id={index} task={task} />
        </div>
      </li>
    </label>
  );

  return (
    <div className="">
      {(task.name.toLowerCase().includes(searchInput.toLowerCase()) &&
        selectedTabCategory === "all" &&
        renderTask()) ||
        (task.category === selectedTabCategory && renderTask())}
    </div>
  );
}
