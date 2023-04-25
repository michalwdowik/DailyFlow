import { ReactNode } from 'react'
import { IconType } from './IconTypes'
import { ColorStyleState } from '../helpers/colorStyleClassHandler'

export interface CategoryType {
    name: string
    icon: IconType
    colorStyle: ColorStyleState
    uuid: string
    isAddedByUser: boolean
}

export type CategoryContextType = {
    categories: CategoryType[]
    removeCategory: (id: string) => void
    addCategory: (category: CategoryType) => void
}

export interface DefaultCategory extends Omit<CategoryType, 'uuid'> {
    color: string
}

export type CategoryContextProviderType = {
    children: ReactNode
}

export type CategoryRadioProps = Pick<
    CategoryProps,
    'changeCategory' | 'categoryUUID'
> & { isCategoryChecked: boolean; radioColor: string }

export type RemoveCategoryButtonProps = {
    removeCategoryHandler: () => void
}

export type CategoryLabelProps = Pick<
    CategoryProps,
    'categoryName' | 'categoryUUID'
>

export type CategoryProps = {
    selectedCategoryUUID: string
    categoryName: string
    categoryColor: ColorStyleState
    isCategoryAddedByUser: boolean
    categoryUUID: string
    changeCategory: () => void
    resetCategorySelection: () => void
}

export type CategoryPickerProps = Pick<
    CategoryProps,
    'categoryColor' | 'resetCategorySelection'
> & {
    selectedCategoryName: string
    onChangeCategory: (category: CategoryType) => void
}

export type CategoryDropdownMenuProps = Pick<CategoryProps, 'categoryColor'> & {
    selectedCategoryName: ReactNode
}
