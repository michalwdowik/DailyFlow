import { ReactNode } from 'react'
import { ColorStyleState } from '../helpers/colorStyleClassHandler'

export type ThemeContextType = {
    colorStyle: ColorStyleState
    setColorStyle: (color: ColorStyleState) => void
}

export interface ThemeContextProviderProps {
    children: ReactNode
}

export interface ContextType {
    selectedCategoryTab: string
    setSelectedCategoryTab: (category: string) => void
}
