/* eslint-disable react/prop-types */
import React, { useState, useContext, useRef, useMemo } from "react";
import { v4 as uuid } from "uuid";
import categories from "./CategoryPicker/categories";
import Button from "../Components/Button";
import CategoryPicker from "./CategoryPicker/CategoryPicker";
import DatePicker from "./DatePicker";
import Importance from "./Importance";
import { MainContext } from "../Contexts";
import Alert from "../Components/Alert";
import { useThemeContext } from "../ThemeContext";

const defaultTaskState = {
    name: '',
    category: categories[0].uuid,
    done: false, 
    rate: 2,
    deadline: "Not specified",
    icon: 'AiFillWallet',
}

export default function Form() {
  const { colorStyle, setColorStyle } = useThemeContext()
  const { taskList, setTaskList, addedCategoriesTab } = useContext(MainContext);
  const [task, setTask] = useState({
    ...defaultTaskState,
    colorStyle,
    id: uuid(),
  })
  const inputRef = useRef("");
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
    if (task.name === "") {
      setIsCorrectTyped(false);
      return 
    }
    if (addedCategoriesTab.length >= 8) {
      showAlert({
        title: "You can add tasks of 8 different categories at a time ",
        type: "error",
        bg: "bg-error",
        isShowed: true,
      });
      return;
    }

      // repalce with nice function from context like addTask
      setTaskList([
        ...taskList,
       task
      ]);
      setTask({
        ...defaultTaskState,
        colorStyle,
        id: uuid()
      })
      setIsSelectDateChecked(false);
      setIsCorrectTyped(true);
    }


  const handleChangeTaskCategory = (category) => {
    setTask({
      ...task,
      category: category.uuid
    })
    setColorStyle(category.colorStyle)
  }

  return (
    <div className="flex flex-col w-full p-5 maxHTaskCreationSection customCard gap-7">
      <span className="mt-2 -mb-6 label-text text-slate-700">Add Task:</span>
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
              className="w-6 h-6"
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
        <CategoryPicker selectedCategoryId={task.category} colorStyle={colorStyle} onCategoryChange={category => handleChangeTaskCategory(category)} />
        <Importance rating={task.rate} setRating={(rate) => setTask({ ...task, rate })} colorStyle={colorStyle} />
        <DatePicker
          colorStyle={colorStyle}
          setTaskDeadline={(deadline) => setTask({ ...task, deadline })}
          isSelectDateChecked={isSelectDateChecked}
          setIsSelectDateChecked={setIsSelectDateChecked}
        />
      <Alert alertData={alertData} />
    </div>
  );
}
