/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useMemo, useState, useContext, ReactNode } from 'react'
import { v4 as uuid } from 'uuid'

type CategoryContextType = {
    categories: Category[]
    removeCategory: (id: string) => void
    addCategory: (category: Category) => void
}

const CategoryContext = createContext<CategoryContextType>({
    categories: [],
    addCategory: () => {},
    removeCategory: () => {},
})

type Category = {
    name: string
    icon: string
    colorStyle: string
    uuid: string
    isAddedByUser: boolean
}

const defaultCategories: Category[] = [
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

type CategoryContextProviderType = {
    children: ReactNode
}

export function CategoryContextProvider({
    children,
}: CategoryContextProviderType) {
    const [categories, setCategories] = useState<Category[]>(defaultCategories)

    const removeCategory = (id: string) => {
        setCategories(
            categories.filter(
                (category) => !category.isAddedByUser || category.uuid !== id
            )
        )
    }

    const addCategory = (category: Category) => {
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
    if (!context) {
        throw Error('You`re missing CategoryContextProvider')
    }
    return context
}
