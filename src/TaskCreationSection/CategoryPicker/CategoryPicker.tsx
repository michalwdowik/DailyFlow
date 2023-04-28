import { useMemo } from 'react'
import {
    ColorStyleState,
    colorStyleBgHandler,
} from '../../helpers/colorStyleClassHandler'
import AddCategoryModal from '../CategoryCreationSection/AddCategoryModal/AddCategoryModal'
import Category from './Category'
import { useCategoryContext } from '../../Contexts/CategoryContext'
import { CategoryType } from '../../types/types'

const CategoryPicker = ({
    categoryColor,
    selectedCategoryName,
    onChangeCategory,
    resetCategorySelection,
}: CategoryPickerProps) => {
    const { categories } = useCategoryContext()

    const selectedCategory = useMemo(
        () =>
            categories.find(
                (category) => category.name === selectedCategoryName
            ),
        [categories, selectedCategoryName]
    )

    return (
        <div className="flex flex-col w-7/12 sm:w-2/4 md:w-2/4 ">
            <span className="mb-1 label-text text-slate-700">
                Select category:
            </span>
            <div className="bg-transparent rounded-lg collapse-arrow collapse">
                <input
                    id="allCategories"
                    aria-label="Unwind all categories"
                    type="checkbox"
                    className="peer"
                />
                <CategoryDropdownMenu
                    selectedCategoryName={selectedCategoryName}
                    categoryColor={categoryColor}
                />
                <div className="flex flex-row flex-wrap gap-2 mt-3 rounded-lg collapse-content ">
                    {categories.map((category) => (
                        <Category
                            changeCategory={() => onChangeCategory(category)}
                            key={category.uuid}
                            categoryName={category.name}
                            categoryColor={category.colorStyle}
                            isCategoryAddedByUser={category.isAddedByUser}
                            categoryUUID={category.uuid}
                            selectedCategoryUUID={
                                selectedCategory ? selectedCategory.uuid : ''
                            }
                            resetCategorySelection={resetCategorySelection}
                        />
                    ))}
                    <AddCategoryModal />
                </div>
            </div>
        </div>
    )
}
export default CategoryPicker

const CategoryDropdownMenu = ({
    selectedCategoryName,
    categoryColor,
}: CategoryDropdownMenuProps) => (
    <div
        className={`${colorStyleBgHandler(
            categoryColor
        )} collapse-title text-slate-700 rounded-3xl transition duration-500 ease-in-out peer-checked:opacity-50 `}
    >
        {selectedCategoryName}
    </div>
)

type CategoryPickerProps = {
    categoryColor: ColorStyleState
    resetCategorySelection: () => void
    selectedCategoryName: string
    onChangeCategory: (category: CategoryType) => void
}

type CategoryDropdownMenuProps = Pick<
    CategoryPickerProps,
    'categoryColor' | 'selectedCategoryName'
>
