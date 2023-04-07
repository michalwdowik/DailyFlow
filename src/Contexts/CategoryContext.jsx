/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { createContext, useMemo, useState, useContext } from 'react'
import { v4 as uuid } from 'uuid'

const CategoryContext = createContext({
    colorStyle: 'info',
})

const defaultCategories = [
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

export function CategoryContextProvider({ children }) {
    const [categories, setCategories] = useState(defaultCategories)

    const removeCategory = (uuid) => {
        setCategories(
            categories.filter(
                (category) => !category.isAddedByUser || category.uuid !== uuid
            )
        )
    }

    const addCategory = (category) => {
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
