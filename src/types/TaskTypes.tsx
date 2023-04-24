import { ReactNode } from 'react'
import { ColorStyleState } from '../helpers/colorStyleClassHandler'

export type TaskContextType = {
    taskList: TaskType[]
    categoryTabs: CategoryTabType[]
    setTaskList: React.Dispatch<React.SetStateAction<TaskType[]>>
}

export type TaskType = {
    uuid: string
    name: string
    category: string
    done: boolean
    rate: number
    deadline: string
    icon: string
    colorStyle: ColorStyleState
}

export type CategoryTabType = {
    name: string
    length: number
    icon: string
    uuid: string
    colorStyle?: string
}

export type TaskContextProviderType = {
    children: ReactNode
}
