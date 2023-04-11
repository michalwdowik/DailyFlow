/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, {
    createContext,
    useMemo,
    useState,
    useContext,
    ReactNode,
} from 'react'
import { v4 as uuid } from 'uuid'

type Task = {
    uuid: string
    name: string
    category: string
    done: boolean
    rate: number
    deadline: string
    icon: string
    colorStyle: string
}

type TaskContextType = {
    // colorStyle: string
    taskList: Task[]
    categoryTabs: Category[]
    setTaskList: React.Dispatch<React.SetStateAction<Task[]>>
}
const TaskContext = createContext<TaskContextType>({
    // colorStyle: 'info',
    taskList: [],
    categoryTabs: [],
    setTaskList: () => {},
})

type TaskContextProviderType = {
    children: ReactNode
}

type Category = {
    categoryName: string
    categoryLength: number
    categoryIcon: string
    categoryUUID: string
    categoryColorStyle?: string
}

export function TaskContextProvider({ children }: TaskContextProviderType) {
    const [taskList, setTaskList] = useState<Task[]>([])
    const defaultCategory: Category = {
        categoryName: 'all',
        categoryLength: 0,
        categoryIcon: 'IoListOutline',
        categoryUUID: uuid(),
    }

    const tabList: Category[] = [defaultCategory]
    const taskSegregated = taskList.reduce<{ [key: string]: Task[] }>(
        (group, arr) => {
            const { category } = arr
            group[category] = group[category] ?? []
            group[category].push(arr)
            return group
        },
        {}
    )

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
        [taskList, categoryTabs]
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
