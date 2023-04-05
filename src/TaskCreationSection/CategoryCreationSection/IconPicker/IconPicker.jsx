/* eslint-disable no-use-before-define */
/* eslint-disable import/prefer-default-export */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import React, { useMemo, useState, useRef } from "react";
import { IconContext } from "react-icons";
import * as icons from "react-icons/io";
import { colorStyleInputHandler } from "../../../colorStyleClassHandler";
import DynamicIcon from "./DynamicIcon";

const toArray = (z) => Object.values(z);
const getLimitIcons = (z, limit = 25) => toArray(z).slice(0, limit);
const findIcons = (z, searchIcon) =>
  icons.filter((icon) =>
    icon.name.toLowerCase().includes(searchIcon.toLowerCase())
  );
const debounceTime = 300;

export function IconPicker({
  newCategoryIcon,
  setNewCategoryIcon,
  colorStyle,
}) {
  const [searchIcon, setSearchIcon] = useState("");
  const [iconsToDisplay, setIconsToDisplay] = useState(toArray(icons));
  const loadingIcons = useRef(false);
  const onInput = (e) => {
    setSearchIcon(e.target.value);
    handleLoadingIcons(e.target.value);
  };

  const handleLoadingIcons = (value) => {
    if (!value) {
      setIconsToDisplay(toArray(icons));
    } else if (!loadingIcons.current) {
      loadingIcons.current = true;
      setTimeout(() => {
        setIconsToDisplay(findIcons(getLimitIcons(icons), searchIcon));
        loadingIcons.current = false;
      }, debounceTime);
    }
  };

  const children = useMemo(
    () =>
      iconsToDisplay.map((Icon) => (
        <button
          className="transition ease-in-out focus:scale-125"
          type="button"
          key={Icon.name}
          onClick={() => setNewCategoryIcon(Icon.name)}
        >
          <Icon />
        </button>
      )),
    [iconsToDisplay.length]
  );

  return (
    <div>
      <div>
        <IconContext.Provider
          value={{
            size: "3em",
            overflow: "x-scroll",
            display: "flex",
            color: "#334155",
          }}
        >
          <div className="flex-none collapse max-h-60 rounded-3xl">
            <input type="checkbox" className="peer" />
            <button
              className="self-center p-0 m-0 transition ease-in-out collapse-title peer-checked:scale-75 peer-checked:overflow-scroll"
              type="button"
            >
              <DynamicIcon name={newCategoryIcon} />
            </button>

            <div className="relative p-0 m-0 overflow-auto collapse-content place-items-center accent-slate-700">
              <input
                value={searchIcon}
                onInput={onInput}
                type="text"
                id="simple-search"
                className={` ${colorStyleInputHandler(
                  colorStyle
                )} customShadow input sticky top-3 m-auto mb-3 block w-3/4 rounded-3xl border-0 bg-base-300 pl-10 text-sm`}
                placeholder="Search task"
              />
              <div className="flex flex-wrap justify-center ">{children}</div>
            </div>
          </div>
        </IconContext.Provider>
      </div>
    </div>
  );
}
