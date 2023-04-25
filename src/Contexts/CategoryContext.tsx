/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useMemo, useState, useContext } from 'react'
import { v4 as uuid } from 'uuid'
import {
    CategoryContextProviderType,
    CategoryContextType,
    CategoryType,
    DefaultCategory,
} from '../types/CategoryTypes'
import { ColorStyleState } from '../helpers/colorStyleClassHandler'

const CategoryContext = createContext<CategoryContextType>({
    categories: [],
    addCategory: () => {},
    removeCategory: () => {},
})

const defaultCategories: CategoryType[] = [
    {
        name: 'general',
        icon: 'IoDocuments',
        colorStyle: 'info',
    },
    {
        name: 'hobby',
        icon: 'IoHeart',
        colorStyle: 'error',
    },
    {
        name: 'activities',
        icon: 'IoPulse',
        colorStyle: 'success',
    },
    {
        name: 'work',
        icon: 'IoLaptop',
        colorStyle: 'primary',
    },
    {
        name: 'school',
        icon: 'IoSchool',
        colorStyle: 'warning',
    },
].map((category) => ({
    ...category,
    uuid: uuid(),
    isAddedByUser: false,
    colorStyle: category.colorStyle as ColorStyleState,
}))

export const defaultCategoryParams: DefaultCategory = {
    name: '',
    colorStyle: 'info',
    color: '#38bdf8',
    icon: 'IoIosHappy',
    isAddedByUser: true,
}

export const CategoryContextProvider = ({
    children,
}: CategoryContextProviderType): JSX.Element => {
    const [categories, setCategories] =
        useState<CategoryType[]>(defaultCategories)

    const removeCategory = (id: string) => {
        setCategories(
            categories.filter(
                (category) => !category.isAddedByUser || category.uuid !== id
            )
        )
    }

    const addCategory = (category: CategoryType) => {
        setCategories([...categories, category])
    }

    const value = useMemo(
        () => ({
            categories,
            removeCategory,
            addCategory,
        }),
        [categories]
    )

    return (
        <CategoryContext.Provider value={value}>
            {children}
        </CategoryContext.Provider>
    )
}

export const useCategoryContext = () => {
    const context = useContext(CategoryContext)
    if (!context) throw Error('You`re missing CategoryContextProvider')
    return context
}
