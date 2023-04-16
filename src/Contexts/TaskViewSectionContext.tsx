import { createContext } from 'react'

type TaskViewSectionContextType = {
    selectedCategoryTab: string
    setSelectedCategoryTab: (category: string) => void
}
const TaskViewSectionContext = createContext<TaskViewSectionContextType>({
    selectedCategoryTab: 'all',
    setSelectedCategoryTab: () => {},
})

export default TaskViewSectionContext
