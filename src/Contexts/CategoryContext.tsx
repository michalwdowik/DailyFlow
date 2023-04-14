/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useMemo, useState, useContext, ReactNode } from 'react'
import { v4 as uuid } from 'uuid'

type CategoryContextType = {
    categories: CategoryType[]
    removeCategory: (id: string) => void
    addCategory: (category: CategoryType) => void
}

const CategoryContext = createContext<CategoryContextType>({
    categories: [],
    addCategory: () => {},
    removeCategory: () => {},
})

export interface CategoryType {
    name: string
    icon: string
    colorStyle: string
    uuid: string
    isAddedByUser: boolean
}

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
].map((category) => ({ ...category, uuid: uuid(), isAddedByUser: false }))

export interface DefaultCategory extends Omit<CategoryType, 'uuid'> {
    color: string
}

export const defaultCategoryParams: DefaultCategory = {
    name: '',
    colorStyle: 'info',
    color: '#38bdf8',
    icon: 'IoIosHappy',
    isAddedByUser: true,
}

type CategoryContextProviderType = {
    children: ReactNode
}

export function CategoryContextProvider({
    children,
}: CategoryContextProviderType): JSX.Element {
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
