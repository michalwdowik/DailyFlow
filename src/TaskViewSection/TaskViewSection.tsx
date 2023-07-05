import { useMemo, useState } from 'react'
import TaskViewSectionContext from '../Contexts/TaskViewSectionContext'
import TaskList from './TaskList'
import CategoriesMenu from './CategoriesMenu/CategoriesMenu'

const TaskViewSection = () => {
    const [selectedCategoryTab, setSelectedCategoryTab] =
        useState<string>('all')

    const value = useMemo<TaskViewSectionContextType>(
        () => ({
            selectedCategoryTab,
            setSelectedCategoryTab,
        }),
        [selectedCategoryTab]
    )

    return (
        <div className="self-start flex flex-col w-full p-0 glassmorphism-card gap-7 transition-[100px]">
            <TaskViewSectionContext.Provider value={value}>
                <CategoriesMenu />
                <TaskList />
            </TaskViewSectionContext.Provider>
        </div>
    )
}
export default TaskViewSection

type TaskViewSectionContextType = {
    selectedCategoryTab: string
    setSelectedCategoryTab: (category: string) => void
}
