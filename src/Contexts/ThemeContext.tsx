import { createContext, useMemo, useState, useContext, ReactNode } from 'react'
import { ColorStyleState } from '../helpers/colorStyleClassHandler'

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

type ThemeContextProviderProps = {
    children: ReactNode
}

type ThemeContextType = {
    colorStyle: ColorStyleState
    setColorStyle: (color: ColorStyleState) => void
}
