/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import React, { useMemo, useState } from "react";
import { IconContext } from "react-icons";
import * as icons from "react-icons/io";
import { colorStyleInputHandler } from "../colorStyleClassHandler";
import DynamicIcon from "./DynamicIcon";

function IconPicker({
  newCategoryIcon,
  setNewCategoryIcon,
  colorStyle,
  searchIcon,
  setSearchIcon,
}) {
  const onInput = (e) => {
    setSearchIcon(e.target.value);
  };

  // const xd = useMemo(() => {
  //   return Object.entries(icons);
  // }, []);

  const memoizedResult = useMemo(() => {
    return Object.entries(icons)
      .filter(([name]) => name.toLowerCase().includes(searchIcon.toLowerCase()))
      .map(([name, Icon]) => ({ name, Icon }));
  }, [searchIcon]);

  const children = useMemo(
    () =>
      memoizedResult.map(({ name, Icon }) => (
        <button
          className="transition ease-in-out focus:scale-125"
          type="button"
          key={name}
          onClick={() => setNewCategoryIcon(Icon.name)}
        >
          <Icon />
        </button>
      )),
    [searchIcon]
  );

  return (
    <div>
      {console.log("does it")}
      <div>
        <IconContext.Provider
          value={{
            size: "3em",
            overflow: "x-scroll",
            display: "flex",
            color: "#334155",
          }}
        >
          <div className="collapse max-h-60 flex-none rounded-3xl">
            <input type="checkbox" className="peer" />
            <button
              className="collapse-title m-0 self-center p-0 transition ease-in-out peer-checked:scale-75 peer-checked:overflow-scroll"
              type="button"
            >
              <DynamicIcon name={newCategoryIcon} />
            </button>

            <div className="collapse-content relative m-0 place-items-center overflow-auto p-0 accent-slate-700">
              <input
                value={searchIcon}
                onInput={onInput}
                type="text"
                id="simple-search"
                className={` ${colorStyleInputHandler(
                  colorStyle
                )} customShadow input sticky top-3 m-auto mb-3 block w-3/4 rounded-3xl border-0
       bg-base-300 pl-10 text-sm`}
                placeholder="Search task"
                // required
              />

              <div className="flex flex-wrap justify-center ">{children}</div>
            </div>
          </div>
        </IconContext.Provider>
      </div>
    </div>
  );
}

export default IconPicker;
