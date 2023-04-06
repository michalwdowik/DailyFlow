/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { IconContext } from "react-icons";
import * as ImportedIcons from "react-icons/io5";
import { colorStyleInputHandler } from "../../colorStyleClassHandler";

export function Iconpicker({
  newCategoryIcon,
  setNewCategoryIcon,
  colorStyle,
}) {
  const [searchIcon, setSearchIcon] = useState("");
  const onInput = (e) => {
    setSearchIcon(e.target.value);
  };

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
            <SelectedIcon iconName={newCategoryIcon} />
            <div className="relative p-0 m-0 overflow-auto collapse-content place-items-center accent-slate-700">
              <SearchIconInput
                iconName={searchIcon}
                action={onInput}
                color={colorStyleInputHandler(colorStyle)}
              />
              <div className="flex flex-wrap justify-center ">
                <Icons
                  searchIcon={searchIcon}
                  setNewCategoryIcon={setNewCategoryIcon}
                />
              </div>
            </div>
          </div>
        </IconContext.Provider>
      </div>
    </div>
  );
}

const Icons = ({ setNewCategoryIcon, searchIcon }) => {
  const solidIcons = Object.entries(ImportedIcons)
    .filter(([name]) => !name.includes("Sharp") && !name.includes("Outline"))
    .reduce((acc, [name, Icon]) => {
      return { ...acc, [name]: Icon };
    }, {});

  const filteredIcons = Object.entries(solidIcons)
    .filter(([name]) => name.toLowerCase().includes(searchIcon.toLowerCase()))
    .map(([name, Icon]) => ({ name, Icon }));

  return filteredIcons.map(({ name, Icon }) => (
    <button
      className="transition ease-in-out focus:scale-125"
      type="button"
      key={name}
      onClick={() => setNewCategoryIcon(Icon.name)}
    >
      <Icon />
    </button>
  ));
};

function SearchIconInput({ iconName, action, color }) {
  return (
    <input
      value={iconName}
      onInput={action}
      type="text"
      id="simple-search"
      className={` ${color} input sticky top-3 m-auto mb-3 block w-3/4 rounded-3xl border-0 bg-base-300 pl-10 text-sm`}
      placeholder="Search task"
    />
  );
}

function SelectedIcon({ iconName }) {
  return (
    <button
      className="self-center p-0 m-0 transition ease-in-out collapse-title peer-checked:scale-75 peer-checked:overflow-scroll"
      type="button"
    >
      <DynamicIcon name={iconName} />
    </button>
  );
}

export function DynamicIcon({ name }) {
  const Icon = ImportedIcons[name];

  if (!Icon) {
    return <ImportedIcons.IoHappy />;
  }
  return <Icon />;
}
