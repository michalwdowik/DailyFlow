/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { createContext, useMemo, useState, useContext } from 'react'
import { v4 as uuid } from 'uuid'

const TaskContext = createContext({
    colorStyle: 'info',
})

export function TaskContextProvider({ children }) {
    const [taskList, setTaskList] = useState([])
    const defaultCategory = {
        categoryName: 'all',
        categoryLength: 0,
        categoryIcon: 'IoListOutline',
        categoryUUID: uuid(),
    }

    const tabList = [defaultCategory]
    const taskSegregated = taskList.reduce((group, arr) => {
        const { category } = arr
        group[category] = group[category] ?? []
        group[category].push(arr)
        return group
    }, {})

    const categoryTabs = useMemo(() => {
        for (const [key, value] of Object.entries(taskSegregated)) {
            tabList.push({
                categoryName: key,
                categoryLength: value.length,
                categoryIcon: value[0].icon,
                categoryColorStyle: value[0].colorStyle,
                categoryUUID: value[0].uuid,
            })
        }
        return tabList
    }, [taskList.length])

    const value = useMemo(
        () => ({
            taskList,
            setTaskList,
            categoryTabs,
        }),
        [taskList]
    )

    return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}

export const useTaskContext = () => {
    const context = useContext(TaskContext)
    if (!context) {
        throw Error('You`re missing TaskContextProvider')
    }
    return context
}
