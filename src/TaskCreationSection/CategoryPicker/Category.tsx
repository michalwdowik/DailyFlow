import { IoRemoveCircle } from '@react-icons/all-files/io5/IoRemoveCircle'
import {
    ColorStyleState,
    colorStyleRadioHandler,
} from '../../helpers/colorStyleClassHandler'
import { useCategoryContext } from '../../Contexts/CategoryContext'

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
        <div className="flex gap-1 p-1">
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

const CategoryLabel = ({ categoryName, categoryUUID }: CategoryLabelProps) => (
    <label
        htmlFor={categoryUUID}
        className="text-gray-600 transition duration-150 ease-in-out active:text-gray-400"
    >
        {categoryName}
    </label>
)

type CategoryRadioProps = Pick<
    CategoryProps,
    'changeCategory' | 'categoryUUID'
> & { isCategoryChecked: boolean; radioColor: string }

type RemoveCategoryButtonProps = {
    removeCategoryHandler: () => void
}

type CategoryLabelProps = Pick<CategoryProps, 'categoryName' | 'categoryUUID'>

type CategoryProps = {
    selectedCategoryUUID: string
    categoryName: string
    categoryColor: ColorStyleState
    isCategoryAddedByUser: boolean
    categoryUUID: string
    changeCategory: () => void
    resetCategorySelection: () => void
}
