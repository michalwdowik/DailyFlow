/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useMemo, useState, useContext, ReactNode } from 'react'
import { CategoryType } from '../types/types'
import { ColorStyleState } from '../Helpers/colorStyleClassHandler'

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
        id: 'general',
    },
    {
        name: 'hobby',
        icon: 'IoHeart',
        colorStyle: 'error',
        id: 'hobby',
    },
    {
        name: 'activities',
        icon: 'IoPulse',
        colorStyle: 'success',
        id: 'activities',
    },
    {
        name: 'work',
        icon: 'IoLaptop',
        colorStyle: 'primary',
        id: 'work',
    },
    {
        name: 'school',
        icon: 'IoSchool',
        colorStyle: 'warning',
        id: 'school',
    },
].map((category) => ({
    ...category,
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
                (category) => !category.isAddedByUser || category.id !== id
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

type CategoryContextProviderType = {
    children: ReactNode
}

type CategoryContextType = {
    categories: CategoryType[]
    removeCategory: (id: string) => void
    addCategory: (category: CategoryType) => void
}

interface DefaultCategory extends Omit<CategoryType, 'id'> {
    color: string
}
