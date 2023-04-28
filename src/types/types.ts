import { ColorStyleState } from '../Helpers/colorStyleClassHandler'
import iconList from '../Helpers/iconList'

export type IconType = keyof typeof iconList

export type ToolbarButtonsType = {
    allTabIsSelected: boolean
    setAlertState: React.Dispatch<React.SetStateAction<Partial<AlertType>>>
}

export interface CategoryType {
    name: string
    icon: IconType
    colorStyle: ColorStyleState
    uuid: string
    isAddedByUser: boolean
}

export type CategoryTabType = Pick<
    TaskType,
    'name' | 'icon' | 'uuid' | 'colorStyle'
> & {
    length: number
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

export type TaskStatus = 'done' | 'notDone'

export type StarType = {
    index: number
    changeTaskRate: (rate: number) => void
    hoverStars: (stars: number) => void
    taskRate: number
    hoveredStars: number
    categoryColor: ColorStyleState
}

export type SuccessOrErrorType = 'success' | 'error'

export type AlertVariantType = Record<string, AlertType>

export type AlertType = {
    title: string
    type: SuccessOrErrorType
    background: 'bg-error' | 'bg-success'
    isShowed: boolean
}
