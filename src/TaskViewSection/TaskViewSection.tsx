import { useMemo, useState } from 'react'
import TaskViewSectionContext from '../Contexts/TaskViewSectionContext'
import TaskList from './TaskList'
import CategoriesMenu from './CategoriesMenu/CategoriesMenu'

interface ContextType {
    selectedCategoryTab: string
    setSelectedCategoryTab: (category: string) => void
}

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
        <div className="flex flex-col w-full p-0 glassmorphismCard gap-7 transition-[100px]">
            <TaskViewSectionContext.Provider value={value}>
                <CategoriesMenu />
                <TaskList />
            </TaskViewSectionContext.Provider>
        </div>
    )
}
export default TaskViewSection
