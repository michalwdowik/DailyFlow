import { useContext, useRef } from 'react'
import { IoListOutline } from '@react-icons/all-files/io5/IoListOutline'
import TaskViewSectionContext from '../../Contexts/TaskViewSectionContext'
import { DynamicIcon } from '../../TaskCreationSection/CategoryCreationSection/AddCategoryModal/IconPicker'
import { useTaskContext } from '../../Contexts/TaskContext'
import {
    ColorStyleState,
    colorStyleBgHandler,
    colorStyleTooltipHandler,
} from '../../helpers/colorStyleClassHandler'
import { CategoryTabType, IconType } from '../../types/types'

const CategoryTab = ({ categoryTab, categoryTabsLength }: CategoryTabProps) => {
    const { selectedCategoryTab, setSelectedCategoryTab } =
        useContext<TaskViewSectionContextType>(TaskViewSectionContext)
    const { taskList } = useTaskContext()
    const isTabSelected = categoryTab.name === selectedCategoryTab
    const paddingClassName =
        (categoryTabsLength > 8 && 'p-0') ||
        (categoryTabsLength > 6 && 'p-1') ||
        'p-2'
    const categoryTabLength =
        categoryTab.name === 'all' ? taskList.length : categoryTab.length
    const animateIndicatorOnSelectedTab =
        categoryTab.name === selectedCategoryTab && 'animate-bounce'
    const contentRef = useRef<HTMLDivElement>(null)
    const taskListEmpty = taskList.length === 0

    return (
        <li>
            <div
                ref={contentRef}
                className={`${paddingClassName} ${
                    taskListEmpty && 'rounded-2xl'
                } indicator relative mt-4 bg-base-300 shadow-xl transition delay-150 ease-in-out hover:bg-base-200`}
            >
                <TabIndicator
                    categoryColor={categoryTab.colorStyle}
                    categoryLength={categoryTabLength}
                    animate={animateIndicatorOnSelectedTab}
                />
                <Tab
                    tabColor={categoryTab.colorStyle}
                    tabName={categoryTab.name}
                    isTabSelected={isTabSelected}
                    setSelectedCategoryTab={setSelectedCategoryTab}
                    tabIcon={categoryTab.icon}
                />
            </div>
        </li>
    )
}
export default CategoryTab

const TabIndicator = ({
    categoryColor,
    categoryLength,
    animate,
}: TabIndicatorProps): JSX.Element => (
    <span
        className={`badge badge-sm indicator-item absolute left-5 translate-x-0 border-0 shadow-xl md:badge-md lg:badge-sm ${colorStyleBgHandler(
            categoryColor
        )} text-white ${animate}`}
    >
        {categoryLength}
    </span>
)

const TabIcon = ({ iconName, tabName }: TabIconProps) =>
    tabName === 'all' ? <IoListOutline /> : <DynamicIcon iconName={iconName} />
const Tab = ({
    tabColor,
    tabName,
    isTabSelected,
    setSelectedCategoryTab,
    tabIcon,
}: TabProps) => (
    <div
        className={`tooltip tooltip-bottom ${colorStyleTooltipHandler(
            tabColor
        )}`}
        data-tip={tabName}
    >
        <button
            id="categoryTab"
            aria-label="Category Tab"
            type="button"
            onClick={() => setSelectedCategoryTab(tabName)}
            className={`focus:scale-150 transition-transform bg-opacity-100 p-3 text-white hover:text-white hover:opacity-60 sm:text-2xl md:text-3xl lg:text-xl 
        ${isTabSelected && 'scale-150'}`}
        >
            <TabIcon tabName={tabName} iconName={tabIcon} />
        </button>
    </div>
)

type TabIconProps = {
    iconName: IconType
    tabName: string
}

type TabIndicatorProps = {
    categoryColor: ColorStyleState
    categoryLength: number
    animate: string | boolean
}

type CategoryTabProps = {
    categoryTab: CategoryTabType
    categoryTabsLength: number
}

type TaskViewSectionContextType = Pick<TabProps, 'setSelectedCategoryTab'> & {
    selectedCategoryTab: string
}

type TabProps = {
    tabColor: ColorStyleState
    tabName: string
    isTabSelected: boolean
    setSelectedCategoryTab: (category: string) => void
    tabIcon: IconType
}
