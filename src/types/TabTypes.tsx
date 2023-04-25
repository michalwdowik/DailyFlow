import { IconType } from './IconTypes'
import { ColorStyleState } from '../helpers/colorStyleClassHandler'
import { CategoryTabType } from './TaskTypes'

export type TabProps = {
    color: ColorStyleState
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
    color: ColorStyleState
    categoryLength: number
    animate: string | boolean
}

export type CategoryTabProps = {
    categoryTab: CategoryTabType
    categoryTabsLength: number
}

export type ContextType = Pick<TabProps, 'setSelectedCategoryTab'> & {
    selectedCategoryTab: string
}
