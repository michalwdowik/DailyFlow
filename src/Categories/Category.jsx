/* eslint-disable no-restricted-syntax */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useContext } from "react";
import { IoIosRemoveCircle } from "react-icons/io";
import { v4 as uuid2 } from "uuid";
import {colorStyleRadioHandler} from "../colorStyleClassHandler";
import { AlertContext, CategoryParamsContext } from "../Contexts/Contexts";
import categories, {removeCategory} from "./categories";

export default function Category({categoryName, onChange, color, isAddedByUser, uuid}) {
const { setColorStyle, selectedCategoryUUID, setSelectedCategoryUUID} = useContext(CategoryParamsContext)
const { setIsCategoryRemovedAlertVisible} = useContext(AlertContext)

const uniqueID = uuid2();

const removeCategoryHandler = () => {
  removeCategory(uuid);
  if (selectedCategoryUUID === uuid) {
  setSelectedCategoryUUID(categories[0].uuid);
  setColorStyle("info");
  }
  setIsCategoryRemovedAlertVisible(true);
  setTimeout(() => {
    setIsCategoryRemovedAlertVisible(false);
  }, 3000);

}

return (
    <div className="flex gap-1 p-1 ">     
        <input
          id={uniqueID}
          checked={selectedCategoryUUID === uuid} 
          onChange={onChange}
          type="radio"
          name="radio-3"
          className={`  radio  ${colorStyleRadioHandler(color)}`}
        />

        <label htmlFor={uniqueID} className="text-gray-600 transition duration-150 ease-in-out active:text-gray-400">{categoryName}</label>
         {(isAddedByUser && 
         <button onClick={removeCategoryHandler} type="button" className="transition active:scale-125">
           <IoIosRemoveCircle className="text-error opacity-90" />
         </button>
)}
      </div>

  );
}














