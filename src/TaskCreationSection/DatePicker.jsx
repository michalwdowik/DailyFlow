/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Datepicker from "tailwind-datepicker-react";
import { colorStyleTogglerHandler } from "../colorStyleClassHandler";

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);

const options = {
  title: "Select Deadline",
  autoHide: true,
  todayBtn: true,
  clearBtn: false,
  maxDate: new Date("2030-01-01"),
  minDate: new Date("2000-01-01"),
  theme: {
    background: " bg-gray-300 dark:bg-base-300 rounded-3xl z-50",
    todayBtn:
      "transition active:scale-90 active:dark:scale-90  bg-success dark:bg-success  hover:bg-success hover:dark:bg-success",
    clearBtn:
      "transition active:scale-90 active:dark:scale-90 focus:dark:outline-0 focus:outline-0",
    icons: "active:scale-125 transition duration-100 dark:bg-transparent",
    text: " hover:bg-transparent hover:dark:bg-transparent hover:text-slate-300 transition",
    disabledText: "blur pointer-events-none ",
    input: "rounded-3xl dark:bg-base-300",
    inputIcon: "",
    selected:
      "hover:bg-transparent hover:dark:bg-transparent bg-transparent scale-150 duration-100 text-success dark:text-success transition ease-in-out",
  },
  icons: {
    prev: () => (
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 96 960 960"
          width="24"
        >
          <path
            fill="#FFFFFF"
            d="M480 896 160 576l320-320 57 56-224 224h487v80H313l224 224-57 56Z"
          />
        </svg>
      </span>
    ),
    next: () => (
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 96 960 960"
          width="24"
        >
          <path
            fill="#FFFFFF"
            d="m480 896-57-56 224-224H160v-80h487L423 312l57-56 320 320-320 320Z"
          />
        </svg>
      </span>
    ),
  },
  datepickerClassNames: "absolute -inset-x-14 -top-[310px]",
  defaultDate: today,
  language: "en",
};

export default function DatePicker({
  setTaskDeadline,
  isSelectDateChecked,
  setIsSelectDateChecked,
  colorStyle,
}) {
  const [show, setShow] = useState(false);
  const handleChange = (selectedDate) => {
    const day = selectedDate.getDate();
    const month = selectedDate.getMonth() + 1;
    const year = selectedDate.getFullYear();
    const formatDate = `${month}/${day}/${year}`;

    setTaskDeadline(formatDate);
  };
  const handleClose = (state) => {
    setShow(state);
  };

  const checkSelectedDateHandler = () => {
    setIsSelectDateChecked(!isSelectDateChecked);
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const formatDate = `${month}/${day}/${year}`;
    setTaskDeadline(formatDate);
  };

  return (
    <div className="relative flex flex-col gap-2 mb-2">
      <label className="relative inline-flex gap-3 cursor-pointer label-text ">
        <input
          type="checkbox"
          value=""
          className="sr-only peer "
          checked={isSelectDateChecked}
          onChange={checkSelectedDateHandler}
        />
        <div
          className={`peer h-6 w-11 rounded-full transition-all ease-in-out after:absolute after:top-0.5 after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white 
          ${colorStyleTogglerHandler(
            colorStyle
          )}  customShadow relative duration-150 bg-slate-700 dark:bg-slate-700 `}
        />
        <span
          className={`text-slate-700 ${
            isSelectDateChecked ? "opacity-50" : "opacity-100"
          }`}
        >
          Set Deadline
        </span>
      </label>
      {isSelectDateChecked && (
        <Datepicker
          options={options}
          onChange={handleChange}
          show={show}
          setShow={handleClose}
        />
      )}
    </div>
  );
}
