import { createContext } from 'react'

const TaskViewSectionContext = createContext<TaskViewSectionContextType>({
    selectedCategoryTab: 'all',
    setSelectedCategoryTab: () => {},
})

export default TaskViewSectionContext

type TaskViewSectionContextType = {
    selectedCategoryTab: string
    setSelectedCategoryTab: (category: string) => void
}
