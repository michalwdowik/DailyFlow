/* eslint-disable @typescript-eslint/no-redeclare */
import { ReactNode, useMemo } from 'react'
import { colorStyleBgHandler } from '../../Helpers/colorStyleClassHandler'
import AddCategoryModal from '../CategoryCreationSection/AddCategoryModal/AddCategoryModal'
import Category from './Category'
import {
    useCategoryContext,
    CategoryType,
} from '../../Contexts/CategoryContext'

type CategoryPickerProps = {
    categoryColor: string
    selectedCategoryName: string
    onChangeCategory: (category: CategoryType) => void
    resetCategorySelection: () => void
}

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
            <div className="bg-transparent collapse-arrow collapse rounded-xl">
                <input type="checkbox" className="peer" />
                <CategoryDropdownMenu
                    selectedCategoryName={selectedCategoryName}
                    categoryColor={categoryColor}
                />
                <div className="flex flex-row flex-wrap content-center justify-center gap-2 mt-3 bg-transparent rounded-lg collapse-content text-primary-content peer-checked:bg-transparent peer-checked:text-secondary-content">
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

type CategoryDropdownMenuProps = {
    selectedCategoryName: ReactNode
    categoryColor: string
}
const CategoryDropdownMenu = ({
    selectedCategoryName,
    categoryColor,
}: CategoryDropdownMenuProps) => (
    <div
        className={`${colorStyleBgHandler(
            categoryColor
        )} collapse-title rounded-3xl text-primary-content transition duration-150 ease-in-out peer-checked:text-secondary-content peer-checked:opacity-75`}
    >
        {selectedCategoryName}
    </div>
)
