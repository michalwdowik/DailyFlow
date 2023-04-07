/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
import React from 'react'
import { IoIosRemoveCircle } from 'react-icons/io'
import { colorStyleRadioHandler } from '../../colorStyleClassHandler'
import { useCategoryContext } from '../../Contexts/CategoryContext'

export default function Category({
    selectedCategoryUUID,
    categoryName,
    color,
    isAddedByUser,
    uuid,
    onChange,
    resetCategorySelection,
}) {
    const { removeCategory } = useCategoryContext()
    const categoryIsChecked = selectedCategoryUUID === uuid
    const removeCategoryHandler = () => {
        if (categoryIsChecked) {
            resetCategorySelection()
        }
        removeCategory(uuid)
    }

    return (
        <div className="flex gap-1 p-1 ">
            <CategoryRadio
                uuid={uuid}
                checked={categoryIsChecked}
                action={onChange}
                radioColor={colorStyleRadioHandler(color)}
            />
            <CategoryLabel name={categoryName} uuid={uuid} />
            {isAddedByUser && (
                <RemoveCategoryButton action={removeCategoryHandler} />
            )}
        </div>
    )
}

function CategoryRadio({ checked, action, radioColor, uuid }) {
    return (
        <input
            id={uuid}
            checked={checked}
            onChange={action}
            type="radio"
            name="radio-3"
            className={`radio ${radioColor}`}
        />
    )
}

function RemoveCategoryButton({ action }) {
    return (
        <button
            onClick={action}
            type="button"
            className="transition active:scale-125"
        >
            <IoIosRemoveCircle className="text-error opacity-90" />
        </button>
    )
}

function CategoryLabel({ name, uuid }) {
    return (
        <label
            htmlFor={uuid}
            className="text-gray-600 transition duration-150 ease-in-out active:text-gray-400"
        >
            {name}
        </label>
    )
}
