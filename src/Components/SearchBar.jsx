/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { colorStyleInputHandler } from "../colorStyleClassHandler";
import Button from "./Button";
import { TaskDetailsContext } from "../Contexts/Contexts";

export default function SearchBar({ searchInput, onInput, colorStyle }) {
  const { removeTasksHandler, markAllAsDone, markAllAsUndone } =
    useContext(TaskDetailsContext);

  return (
    <div className="relative flex gap-5 border-error">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 ">
        <svg
          aria-hidden="true"
          className="h-5 w-5 text-gray-500 dark:text-gray-400 "
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <input
        value={searchInput}
        onInput={onInput}
        type="text"
        id="simple-search"
        className={` ${colorStyleInputHandler(
          colorStyle
        )} customShadow input block w-full rounded-3xl border-0
       bg-base-300 pl-10 text-xs placeholder-transparent dark:text-white
             sm:text-sm sm:placeholder-gray-400  `}
        placeholder="Search task"
      />
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
          action={markAllAsDone}
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
          action={markAllAsUndone}
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
    </div>
  );
}
