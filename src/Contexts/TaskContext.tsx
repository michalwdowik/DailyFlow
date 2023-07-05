/* eslint-disable react-hooks/exhaustive-deps */
import React, {
    createContext,
    useMemo,
    useState,
    useContext,
    ReactNode,
    useId,
} from 'react'
import { CategoryTabType, TaskType } from '../types/types'

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
    id: '',
}

export const TaskContextProvider = ({ children }: TaskContextProviderType) => {
    const [taskList, setTaskList] = useState<TaskType[]>([])
    const id = useId()
    const defaultCategory: CategoryTabType = {
        name: 'all',
        length: 0,
        icon: 'IoListOutline',
        id,
        colorStyle: 'default',
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
                id: task[0].id,
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

type TaskContextProviderType = {
    children: ReactNode
}

type TaskContextType = {
    taskList: TaskType[]
    categoryTabs: CategoryTabType[]
    setTaskList: React.Dispatch<React.SetStateAction<TaskType[]>>
}
