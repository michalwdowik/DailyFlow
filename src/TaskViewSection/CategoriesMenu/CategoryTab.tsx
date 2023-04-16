/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-redeclare */

import { useContext } from 'react'
import { IoListOutline } from 'react-icons/io5'
import TaskViewSectionContext from '../../Contexts/TaskViewSectionContext'
import { DynamicIcon } from '../../TaskCreationSection/CategoryCreationSection/IconPicker'
import { CategoryTabType, useTaskContext } from '../../Contexts/TaskContext'
import {
    colorStyleBgHandler,
    colorStyleTooltipHandler,
} from '../../Helpers/colorStyleClassHandler'

type CategoryTabProps = {
    categoryTab: CategoryTabType
    categoryTabsLength: number
}

type ContextType = {
    selectedCategoryTab: string
    setSelectedCategoryTab: (category: string) => void
}

const calculatePadding = (categoryTabsLength: number): string => {
    if (categoryTabsLength > 8) return 'p-0'
    if (categoryTabsLength > 6) return 'p-1'
    return 'p-2'
}

const CategoryTab = ({ categoryTab, categoryTabsLength }: CategoryTabProps) => {
    const { selectedCategoryTab, setSelectedCategoryTab } =
        useContext<ContextType>(TaskViewSectionContext)
    const { taskList } = useTaskContext()
    const isTabSelected = categoryTab.name === selectedCategoryTab
    const paddingClassName = calculatePadding(categoryTabsLength)
    const categoryTabLength =
        categoryTab.name === 'all' ? taskList.length : categoryTab.length
    const animateIndicatorOnSelectedTab =
        categoryTab.name === selectedCategoryTab && 'animate-bounce'

    const taskListEmpty = taskList.length === 0

    return (
        <li>
            <div
                className={`${paddingClassName} ${
                    taskListEmpty && 'rounded-2xl'
                } indicator relative mt-4 bg-base-300 shadow-xl transition delay-150 ease-in-out hover:bg-base-200`}
            >
                <TabIndicator
                    color={categoryTab.colorStyle ?? ''}
                    categoryLength={categoryTabLength}
                    animate={animateIndicatorOnSelectedTab}
                />
                <Tab
                    color={categoryTab.colorStyle ?? ''}
                    name={categoryTab.name}
                    isTabSelected={isTabSelected}
                    setSelectedCategoryTab={setSelectedCategoryTab}
                    icon={categoryTab.icon}
                />
            </div>
        </li>
    )
}
export default CategoryTab

type TabIndicatorProps = {
    color: string
    categoryLength: number
    animate: string | boolean
}

const TabIndicator = ({
    color,
    categoryLength,
    animate,
}: TabIndicatorProps): JSX.Element => (
    <span
        className={`badge badge-sm indicator-item absolute left-5 translate-x-0 border-0 shadow-xl md:badge-md lg:badge-sm ${colorStyleBgHandler(
            color
        )} text-white ${animate}`}
    >
        {categoryLength}
    </span>
)

type TabIconProps = {
    iconName: string
    categoryName: string
}

const TabIcon = ({ iconName, categoryName }: TabIconProps) =>
    categoryName === 'all' ? <IoListOutline /> : <DynamicIcon name={iconName} />

type TabProps = {
    color: string
    name: string
    isTabSelected: boolean
    setSelectedCategoryTab: (category: string) => void
    icon: string
}

const Tab = ({
    color,
    name,
    isTabSelected,
    setSelectedCategoryTab,
    icon,
}: TabProps) => (
    <div
        className={`tooltip tooltip-bottom ${colorStyleTooltipHandler(color)}`}
        data-tip={name}
    >
        <button
            type="button"
            onClick={() => setSelectedCategoryTab(name)}
            className={`focus:scale-150 transition-transform bg-opacity-100 p-3 text-white hover:text-white hover:opacity-60 sm:text-2xl md:text-3xl lg:text-xl 
        ${isTabSelected && 'scale-150'}`}
        >
            <TabIcon categoryName={name} iconName={icon} />
        </button>
    </div>
)
