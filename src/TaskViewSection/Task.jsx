/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import TaskDetailsModal from "./TaskDetailsModal";
import { colorStyleCheckboxHandler } from "../colorStyleClassHandler";
import { TaskDetailsContext } from "../Contexts/Contexts";

export default function Task({ task, onChange, index, searchInput }) {
  const { selectedTabCategory } = useContext(TaskDetailsContext);

  return (
    <div className="">
      {selectedTabCategory === "all" &&
        task.name.toLowerCase().includes(searchInput.toLowerCase()) && (
          <label>
            <li className="border-0 border-b border-solid border-slate-200 py-2 sm:py-4">
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
                <div className="min-w-0 flex-1">
                  <p className="transition-delay-50 truncate text-sm font-medium text-slate-700 transition hover:text-gray-400">
                    {task.name}
                  </p>
                  <p className="truncate text-sm text-gray-500 ">
                    {task.category}
                  </p>
                </div>

                <div className="inline-flex items-center text-base font-semibold text-slate-700 ">
                  {[...Array(task.rate)].map((e, i) => (
                    <span key={i}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-4 w-4"
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
                {/* <Portal> */}

                <TaskDetailsModal id={index} task={task} />

                {/* </Portal> */}
              </div>
            </li>
          </label>
        )}
      {task.category === selectedTabCategory &&
        task.name.toLowerCase().includes(searchInput.toLowerCase()) && (
          <label>
            <li className="border-0 border-b border-solid border-slate-200 py-2 sm:py-4">
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
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-700 ">
                    {task.name}
                  </p>
                  <p className="truncate text-sm text-gray-500">
                    {task.category}
                  </p>
                </div>

                <div className="inline-flex items-center text-base font-semibold text-slate-700 ">
                  {[...Array(task.rate)].map((e, i) => (
                    <span key={i}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-4 w-4"
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
        )}
    </div>
  );
}
