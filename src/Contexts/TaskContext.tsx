/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useMemo, useState, useContext } from 'react'
import { v4 as uuid } from 'uuid'
import {
    CategoryTabType,
    TaskContextProviderType,
    TaskContextType,
    TaskType,
} from '../types/TaskTypes'

const TaskContext = createContext<TaskContextType>({
    taskList: [],
    categoryTabs: [],
    setTaskList: () => {},
})

export const defaultTask: TaskType = {
    name: '',
    category: 'general',
    done: false,
    rate: 2,
    deadline: 'Not specified',
    icon: 'IoDocuments',
    colorStyle: 'info',
    uuid: uuid(),
}

export const TaskContextProvider = ({ children }: TaskContextProviderType) => {
    const [taskList, setTaskList] = useState<TaskType[]>([])
    const defaultCategory: CategoryTabType = {
        name: 'all',
        length: 0,
        icon: 'IoListOutline',
        uuid: uuid(),
        colorStyle: 'info',
    }

    const taskSegregated = taskList.reduce<{ [key: string]: TaskType[] }>(
        (group, arr) => {
            const { category } = arr
            return {
                ...group,
                [category]: [...(group[category] || []), arr],
            }
        },
        {}
    )
    const categoryTabs = useMemo(() => {
        const tab = Object.values(taskSegregated).map((task) => {
            return {
                name: task[0].category,
                length: task.length,
                icon: task[0].icon,
                colorStyle: task[0].colorStyle,
                uuid: task[0].uuid,
            }
        })
        return [defaultCategory, ...tab]
    }, [taskList.length])

    const value = useMemo(
        () => ({
            taskList,
            setTaskList,
            categoryTabs,
        }),
        [taskList, categoryTabs]
    )

    return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}

export const useTaskContext = () => {
    const context = useContext(TaskContext)
    if (!context) throw Error('You`re missing TaskContextProvider')
    return context
}
