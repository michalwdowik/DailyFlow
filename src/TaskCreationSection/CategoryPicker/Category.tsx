import { IoRemoveCircle } from 'react-icons/io5'
import { colorStyleRadioHandler } from '../../Helpers/colorStyleClassHandler'
import { useCategoryContext } from '../../Contexts/CategoryContext'

type CategoryProps = {
    selectedCategoryUUID: string
    categoryName: string
    categoryColor: string
    isCategoryAddedByUser: boolean
    categoryUUID: string
    changeCategory: () => void
    resetCategorySelection: () => void
}

const Category = ({
    selectedCategoryUUID,
    categoryName,
    categoryColor,
    isCategoryAddedByUser,
    categoryUUID,
    changeCategory,
    resetCategorySelection,
}: CategoryProps): JSX.Element => {
    const { removeCategory } = useCategoryContext()
    const categoryIsChecked = selectedCategoryUUID === categoryUUID
    const removeCategoryHandler = () => {
        if (categoryIsChecked) resetCategorySelection()
        removeCategory(categoryUUID)
    }

    return (
        <div className="flex gap-1 p-1 ">
            <CategoryRadio
                categoryUUID={categoryUUID}
                isCategoryChecked={categoryIsChecked}
                changeCategory={changeCategory}
                radioColor={colorStyleRadioHandler(categoryColor)}
            />
            <CategoryLabel
                categoryName={categoryName}
                categoryUUID={categoryUUID}
            />
            {isCategoryAddedByUser && (
                <RemoveCategoryButton
                    removeCategoryHandler={removeCategoryHandler}
                />
            )}
        </div>
    )
}
export default Category

type CategoryRadioProps = {
    isCategoryChecked: boolean
    changeCategory: () => void
    radioColor: string
    categoryUUID: string
}

const CategoryRadio = ({
    isCategoryChecked,
    changeCategory,
    radioColor,
    categoryUUID,
}: CategoryRadioProps) => (
    <input
        id={categoryUUID}
        checked={isCategoryChecked}
        onChange={changeCategory}
        type="radio"
        name="radio-3"
        className={`radio ${radioColor}`}
    />
)

type RemoveCategoryButtonProps = {
    removeCategoryHandler: () => void
}
const RemoveCategoryButton = ({
    removeCategoryHandler,
}: RemoveCategoryButtonProps) => (
    <button
        onClick={removeCategoryHandler}
        type="button"
        className="transition active:scale-125"
    >
        <IoRemoveCircle className="text-error opacity-90" />
    </button>
)
type CategoryLabelProps = {
    categoryName: string
    categoryUUID: string
}

const CategoryLabel = ({ categoryName, categoryUUID }: CategoryLabelProps) => (
    <label
        htmlFor={categoryUUID}
        className="text-gray-600 transition duration-150 ease-in-out active:text-gray-400"
    >
        {categoryName}
    </label>
)
