import { createContext } from 'react'

type TaskViewSectionContextType = {
    selectedCategoryTab: string
    setSelectedCategoryTab: (category: string) => void
}

export const TaskViewSectionContext = createContext<TaskViewSectionContextType>(
    {
        selectedCategoryTab: 'all',
        setSelectedCategoryTab: () => {},
    }
)

type ToolbarContextType = {
    searchInput: string
    onInput: (e: React.ChangeEvent<HTMLInputElement>) => void
}
export const ToolbarContext = createContext<ToolbarContextType>({
    searchInput: '',
    onInput: () => {},
})
