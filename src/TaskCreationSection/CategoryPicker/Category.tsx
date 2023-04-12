/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
import { IoIosRemoveCircle } from 'react-icons/io'
import { colorStyleRadioHandler } from '../../colorStyleClassHandler'
import { useCategoryContext } from '../../Contexts/CategoryContext'

type CategoryProps = {
    selectedCategoryUUID: string
    categoryName: string
    color: string
    isAddedByUser: boolean
    uuid: string
    onChange: () => void
    resetCategorySelection: () => void
}

export default function Category({
    selectedCategoryUUID,
    categoryName,
    color,
    isAddedByUser,
    uuid,
    onChange,
    resetCategorySelection,
}: CategoryProps): JSX.Element {
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

type CategoryRadioProps = {
    checked: boolean
    action: () => void
    radioColor: string
    uuid: string
}

function CategoryRadio({
    checked,
    action,
    radioColor,
    uuid,
}: CategoryRadioProps) {
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

type RemoveCategoryButtonProps = {
    action: () => void
}
function RemoveCategoryButton({ action }: RemoveCategoryButtonProps) {
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
type CategoryLabelProps = {
    name: string
    uuid: string
}

function CategoryLabel({ name, uuid }: CategoryLabelProps) {
    return (
        <label
            htmlFor={uuid}
            className="text-gray-600 transition duration-150 ease-in-out active:text-gray-400"
        >
            {name}
        </label>
    )
}
