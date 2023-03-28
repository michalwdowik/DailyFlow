/* eslint-disable react/prop-types */

import React, { useState, useContext, useRef, useMemo } from "react";
import categories from "./CategoryPicker/categories";
import Button from "../Components/Button";
import CategoryPicker from "./CategoryPicker/CategoryPicker";
import Importance from "./Importance";
import DatePicker from "./DatePicker";
import { CategoryParamsContext, MainContext } from "../Contexts";
import Alert from "../Components/Alert";

export default function Form({ colorStyle, setColorStyle }) {
  const { taskList, setTaskList, addedCategoriesTab } = useContext(MainContext);
  const [selectedCategoryName, setSelectedCategoryName] = useState("general");
  const [selectedCategoryUUID, setSelectedCategoryUUID] = useState(
    categories[0].uuid
  );
  const [rating, setRating] = useState(2);
  const inputRef = useRef("");
  const [taskDeadline, setTaskDeadline] = useState("Not specified");
  const [icon, setIcon] = useState("AiFillWallet");
  const [isSelectDateChecked, setIsSelectDateChecked] = useState(false);
  const [isCorrectTyped, setIsCorrectTyped] = useState(true);
  const [alertData, setAlertData] = useState({});

  const showAlert = (params) => {
    setAlertData({
      title: params.title,
      type: params.type,
      bg: params.bg,
      isShowed: params.isShowed,
    });
    setTimeout(() => {
      setAlertData({ isShowed: false });
    }, 3000);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (inputRef.current.value !== "") {
      if (addedCategoriesTab.length >= 8) {
        showAlert({
          title: "You can add tasks of 8 different categories at a time ",
          type: "error",
          bg: "bg-error",
          isShowed: true,
        });
        return;
      }

      setTaskList([
        ...taskList,
        {
          name: inputRef.current.value,
          category: selectedCategoryName,
          done: false,
          rate: rating,
          deadline: taskDeadline,
          icon,
          colorStyle,
        },
      ]);
      inputRef.current.value = "";
      setIsSelectDateChecked(false);
      setTaskDeadline("Not specified");
      setIsCorrectTyped(true);
    } else {
      setIsCorrectTyped(false);
    }
  };

  const setCategoryParams = (e) => {
    setSelectedCategoryName(e.name);
    setSelectedCategoryUUID(e.uuid);
    setIcon(e.icon);
    setColorStyle(e.colorStyle);
  };

  const value = useMemo(
    () => ({
      selectedCategoryName,
      setCategoryParams,
      colorStyle,
      setSelectedCategoryName,
      setColorStyle,
      selectedCategoryUUID,
      setSelectedCategoryUUID,
    }),
    [selectedCategoryName, colorStyle, selectedCategoryUUID]
  );

  return (
    <div className="maxHTaskCreationSection customCard flex w-full flex-col gap-7 p-5">
      <span className="label-text mt-2 -mb-6 text-slate-700">Add Task:</span>
      <div className="flex w-5/6 gap-5 sm:w-4/6 md:w-4/6">
        <input
          maxLength={30}
          ref={inputRef}
          type="text"
          placeholder="Type here..."
          id="taskInput"
          className={`customShadow w-full rounded-3xl bg-base-300  ${
            !isCorrectTyped ? "input-error" : "input"
          }  input ${inputRef !== "" && "focus:input-success"}`}
        />
        <Button
          toolTipClass="tooltip hover:tooltip hover:tooltip-open hover:tooltip-success"
          toolTipText="Add Task"
          className="btn-m customShadow btn-success btn-circle btn"
          action={submitHandler}
          title={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          }
        />
      </div>
      <CategoryParamsContext.Provider value={value}>
        <CategoryPicker />
        <Importance rating={rating} setRating={setRating} />
      </CategoryParamsContext.Provider>
      <DatePicker
        colorStyle={colorStyle}
        setTaskDeadline={setTaskDeadline}
        isSelectDateChecked={isSelectDateChecked}
        setIsSelectDateChecked={setIsSelectDateChecked}
      />
      <Alert alertData={alertData} />
    </div>
  );
}
