/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
import React, {
    createContext,
    useMemo,
    useState,
    useContext,
    ReactNode,
} from 'react'
import { v4 as uuid } from 'uuid'

export type TaskType = {
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
    taskList: TaskType[]
    categoryTabs: CategoryTabType[]
    setTaskList: React.Dispatch<React.SetStateAction<TaskType[]>>
}
const TaskContext = createContext<TaskContextType>({
    taskList: [],
    categoryTabs: [],
    setTaskList: () => {},
})

type TaskContextProviderType = {
    children: ReactNode
}

export type CategoryTabType = {
    categoryName: string
    categoryLength: number
    categoryIcon: string
    categoryUUID: string
    categoryColorStyle?: string
}

export function TaskContextProvider({ children }: TaskContextProviderType) {
    const [taskList, setTaskList] = useState<TaskType[]>([])
    const defaultCategory: CategoryTabType = {
        categoryName: 'all',
        categoryLength: 0,
        categoryIcon: 'IoListOutline',
        categoryUUID: uuid(),
    }

    const tabList: CategoryTabType[] = [defaultCategory]
    const taskSegregated = taskList.reduce<{ [key: string]: TaskType[] }>(
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
