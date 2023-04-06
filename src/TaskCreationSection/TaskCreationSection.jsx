/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
import React, { useState, useContext, useRef } from "react";
import { v4 as uuid } from "uuid";
import Button from "../Components/Button";
import CategoryPicker from "./CategoryPicker/CategoryPicker";
import DatePicker from "./DatePicker";
import Importance from "./Importance";
import { MainContext } from "../Contexts";
import Alert from "../Components/Alert";

export default function TaskCreationSection({ colorStyle, setColorStyle }) {
  const defaultTask = {
    name: "",
    category: "general",
    done: false,
    rate: 2,
    deadline: "Not specified",
    icon: "AiFillWallet",
    colorStyle,
  };
  const [task, setTask] = useState({
    ...defaultTask,
  });

  const { taskList, setTaskList, addedCategoriesTab } = useContext(MainContext);
  const inputRef = useRef("");
  const [isSelectDateChecked, setIsSelectDateChecked] = useState(false);
  const [isCorrectTyped, setIsCorrectTyped] = useState(true);
  const [alert, setAlert] = useState({});

  const showAlert = (params) => {
    setAlert({
      title: params.title,
      type: params.type,
      background: params.background,
      isShowed: params.isShowed,
    });
    setTimeout(() => {
      setAlert({ isShowed: false });
    }, 3000);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (inputRef.current.value === "") {
      setIsCorrectTyped(false);
      return;
    }
    if (addedCategoriesTab.length >= 8) {
      showAlert({
        title: "You can add tasks of 8 different categories at a time ",
        type: "error",
        background: "bg-error",
        isShowed: true,
      });
      return;
    }

    setTaskList([
      ...taskList,
      {
        ...task,
        name: inputRef.current.value,
        id: uuid(),
      },
    ]);
    inputRef.current.value = "";
    setIsSelectDateChecked(false);
    setIsCorrectTyped(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      submitHandler(e);
    }
  };

  const handleCategoryChange = (category) => {
    setTask({
      ...task,
      category: category.name,
      icon: category.icon,
      colorStyle: category.colorStyle,
    });
    setColorStyle(category.colorStyle);
  };

  const buzzIfTaskNotValid = () => {
    return !isCorrectTyped && "buzz-effect";
  };

  function AddTaskButton({ action }) {
    return (
      <Button
        className={`btn-m btn-circle btn ${buzzIfTaskNotValid()}`}
        action={action}
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
    );
  }

  const colorInputBorder = () => {
    return !isCorrectTyped
      ? "input-error"
      : "input" && inputRef !== "" && "focus:input-success";
  };

  function TaskInput({ action, maxLength }) {
    return (
      <input
        onKeyDown={action}
        maxLength={maxLength}
        ref={inputRef}
        type="text"
        placeholder="Type here..."
        id="taskInput"
        className={`input w-full rounded-3xl bg-base-300  
        ${colorInputBorder()}`}
      />
    );
  }

  return (
    <div className="relative flex flex-col w-full p-5 glassmorphismCard gap-7 ">
      <span className="mt-2 -mb-6 label-text text-slate-700">Add Task:</span>
      <div className="flex w-5/6 gap-5 sm:w-4/6 md:w-4/6">
        <TaskInput action={handleKeyPress} maxLength={30} />
        <AddTaskButton action={submitHandler} />
      </div>
      <CategoryPicker
        colorStyle={colorStyle}
        selectedCategoryName={task.category}
        onChangeCategory={(category) => handleCategoryChange(category)}
      />
      <Importance
        colorStyle={colorStyle}
        rate={task.rate}
        setRate={(rate) => setTask({ ...task, rate })}
      />
      <DatePicker
        colorStyle={colorStyle}
        setTaskDeadline={(deadline) => setTask({ ...task, deadline })}
        isSelectDateChecked={isSelectDateChecked}
        setIsSelectDateChecked={setIsSelectDateChecked}
      />
      <Alert alert={alert} />
    </div>
  );
}
