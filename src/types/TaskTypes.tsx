import { ChangeEvent, Dispatch, ReactNode, SetStateAction } from 'react'
import { IconType } from './IconTypes'
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
    icon: IconType
    colorStyle: ColorStyleState
}

export type CategoryTabType = Pick<
    TaskType,
    'name' | 'icon' | 'uuid' | 'colorStyle'
> & {
    length: number
}

export type TaskContextProviderType = {
    children: ReactNode
}

export type StarProps = {
    index: number
    setTaskRate: (rate: number) => void
    setHoveredStars: Dispatch<SetStateAction<number>>
    taskRate: number
    hoveredStars: number
    categoryColor: ColorStyleState
}

export type TaskImportanceProps = Pick<
    StarProps,
    'taskRate' | 'setTaskRate' | 'categoryColor'
>

export type TaskProps = {
    task: TaskType
    updateTaskStatus: (e: ChangeEvent<HTMLInputElement>) => void
    searchInput: string
}

export type TaskCheckBoxProps = {
    isTaskDone: boolean
    taskColorStyle: ColorStyleState
    updateTaskStatus: (e: ChangeEvent<HTMLInputElement>) => void
}

export type TaskDescriptionProps = {
    taskName: string
    taskCategory: string
}

export type TaskModalImportanceProps = Pick<StarProps, 'taskRate'>
