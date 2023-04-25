import { createContext, useMemo, useState, useContext } from 'react'
import { ColorStyleState } from '../helpers/colorStyleClassHandler'
import {
    ThemeContextProviderProps,
    ThemeContextType,
} from '../types/ContextTypes'

const ThemeContext = createContext<ThemeContextType>({
    colorStyle: 'info',
    setColorStyle: () => {},
})

export const ThemeContextProvider = ({
    children,
}: ThemeContextProviderProps) => {
    const [colorStyle, setColorStyle] = useState<ColorStyleState>('info')
    const value = useMemo(
        () => ({
            colorStyle,
            setColorStyle,
        }),
        [colorStyle]
    )

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    )
}

export const useThemeContext = () => {
    const context = useContext(ThemeContext)
    if (!context) throw Error('You`re missing ThemeContextProvider')
    return context
}
