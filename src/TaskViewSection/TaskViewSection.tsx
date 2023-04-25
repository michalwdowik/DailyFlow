import { useMemo, useState } from 'react'
import TaskViewSectionContext from '../Contexts/TaskViewSectionContext'
import TaskList from './TaskList'
import CategoriesMenu from './CategoriesMenu/CategoriesMenu'
import { ContextType } from '../types/ContextTypes'

const TaskViewSection = () => {
    const [selectedCategoryTab, setSelectedCategoryTab] =
        useState<string>('all')

    const value = useMemo<ContextType>(
        () => ({
            selectedCategoryTab,
            setSelectedCategoryTab,
        }),
        [selectedCategoryTab]
    )

    return (
        <div className=" z-50 self-start flex flex-col w-full p-0 glassmorphismCard gap-7 transition-[100px]">
            <TaskViewSectionContext.Provider value={value}>
                <CategoriesMenu />
                <TaskList />
            </TaskViewSectionContext.Provider>
        </div>
    )
}
export default TaskViewSection
