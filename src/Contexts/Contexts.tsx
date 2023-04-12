import { createContext } from 'react'

type ContextType = {
    selectedTabCategory: string
    setSelectedTabCategory: (category: string) => void
}

export const ViewSectionContext = createContext<ContextType>({
    selectedTabCategory: 'all',
    setSelectedTabCategory: () => {},
})

type ToolbarContextValue = {
    searchInput: string
    onInput: (e: React.ChangeEvent<HTMLInputElement>) => void
}
export const ToolbarContext = createContext<ToolbarContextValue>({
    searchInput: '',
    onInput: () => {},
})
