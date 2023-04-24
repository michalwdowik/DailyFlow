import { CategoryTabType } from '../Contexts/TaskContext'
import { IconType } from './IconTypes'

export type TabProps = {
    color: string
    name: string
    isTabSelected: boolean
    setSelectedCategoryTab: (category: string) => void
    icon: IconType
}

export type TabIconProps = {
    iconName: IconType
    categoryName: string
}

export type TabIndicatorProps = {
    color: string
    categoryLength: number
    animate: string | boolean
}

export type CategoryTabProps = {
    categoryTab: CategoryTabType
    categoryTabsLength: number
}

export type ContextType = {
    selectedCategoryTab: string
    setSelectedCategoryTab: (category: string) => void
}
