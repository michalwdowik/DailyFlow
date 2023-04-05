/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useMemo, useState } from "react";
import { CirclePicker } from "react-color";
import { v4 as uuid } from "uuid";
import { createPortal } from "react-dom";
import { IconPicker } from "./IconPicker/IconPicker";
import {
  colorStyleBgHandler,
  colorPickerColorHandler,
} from "../../colorStyleClassHandler";
import Button from "../../Components/Button";
import categories from "../CategoryPicker/defaultCategories";
import Alert from "../../Components/Alert";

export default function AddCategoryModal({ addCategory }) {
  // Task1
  const [newCategory, setNewCategory] = useState({
    name: "",
    color: "info",
    colorPicker: "#38bdf8",
    icon: "IoIosHappy",
  });

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.keyCode === 27) {
        const checkbox = document.getElementById("my-modal-3");
        checkbox.checked = false;
      }
    };
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const [colorPickerColor, setColorPickerColor] = useState("#38bdf8");

  const [isCorrectTyped, setIsCorrectTyped] = useState(true);
  const portal = document.getElementById("portal");
  const [searchIcon, setSearchIcon] = useState("");
  const [alert, setAlert] = useState({});

  const isCategoryAlreadyAdded = () => {
    const x = categories.filter(
      (category) => category.name === newCategory.name
    );
    return x.length === 0;
  };

  const onInput = (e) => {
    setNewCategory({ ...newCategory, name: e.target.value });
    setIsCorrectTyped(e.target.value !== "");
  };

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

  const createNewCategory = () => {
    if (categories.length >= 12) {
      showAlert({
        title: "You can create up to 7 different categories",
        type: "error",
        background: "bg-error",
        isShowed: true,
      });
      return;
    }
    if (newCategory.name !== "" && isCategoryAlreadyAdded()) {
      addCategory({
        name: newCategory.name.toLowerCase(),
        icon: newCategory.icon,
        colorStyle: newCategory.colorStyle,
        isAddedByUser: true,
        uuid: uuid(),
      });

      setNewCategory({ ...newCategory, name: "" });
      showAlert({
        title: "New category has been added!",
        type: "success",
        background: "bg-success",
        isShowed: true,
      });
    } else {
      setIsCorrectTyped(false);
      showAlert({
        title: "You can't create a category with this name, try again!",
        type: "error",
        background: "bg-error",
        isShowed: true,
      });
    }
  };

  const iconPicker = useMemo(
    () => (
      <IconPicker
        newCategoryIcon={newCategory.icon}
        setNewCategoryIcon={(icon) => setNewCategory({ ...newCategory, icon })}
        searchIcon={searchIcon}
        setSearchIcon={setSearchIcon}
      />
    ),
    [newCategory.icon]
  );

  const changeColorHandler = (color) => {
    setColorPickerColor(color.hex);
    setNewCategory({
      ...newCategory,
      colorStyle: colorPickerColorHandler(color),
    });
  };

  const colorPicker = useMemo(
    () => (
      <CirclePicker
        className="self-center p-0 m-0"
        color={colorPickerColor}
        colors={["#38bdf8", "#f87171", "#10b981", "#7e22ce", "#eab308"]}
        onChangeComplete={changeColorHandler}
      />
    ),
    [colorPickerColor]
  );

  return (
    <div>
      <label
        htmlFor="my-modal-3"
        className="p-1 m-0 font-normal bg-transparent border-0 dark:bg:transparent btn-xs btn text-slate-700 hover:scale-110 hover:bg-transparent"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 96 960 960"
          width="24"
        >
          <path
            fill="#6366f1"
            d="M440 856V616H200v-80h240V296h80v240h240v80H520v240h-80Z"
          />
        </svg>
        add
      </label>
      {createPortal(
        <div>
          <input type="checkbox" id="my-modal-3" className="modal-toggle " />
          <label htmlFor="my-modal-3" className="cursor-pointer modal">
            <label className="flex flex-col content-center justify-center gap-3 p-5 pt-10 mt-5 modal-box rounded-3xl bg-slate-100">
              <div className="indicator">
                <input
                  maxLength={17}
                  onInput={onInput}
                  value={newCategory.name}
                  type="text"
                  placeholder="Type here..."
                  id="taskInput"
                  className={`input-bordered ${
                    isCorrectTyped ? "input" : "input-error"
                  }  input w-full max-w-xs ${
                    isCorrectTyped && "focus:input"
                  } input mb-5 mr-5`}
                />
                <Button
                  action={createNewCategory}
                  className={`text-white ${colorStyleBgHandler(
                    newCategory.colorStyle
                  )} btn-circle transition-all active:scale-90`}
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
              {colorPicker}
              {iconPicker}
            </label>
          </label>
        </div>,
        portal
      )}
      <Alert alert={alert} />
    </div>
  );
}
