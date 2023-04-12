import { createContext, useMemo, useState, useContext, ReactNode } from 'react'

type ThemeContextType = {
    colorStyle: string
    setColorStyle: (color: string) => void
}

const ThemeContext = createContext<ThemeContextType>({
    colorStyle: 'info',
    setColorStyle: () => {},
})

interface ThemeContextProviderProps {
    children: ReactNode
}

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
    const [colorStyle, setColorStyle] = useState('info')
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
    if (!context) {
        throw Error('You`re missing ThemeContextProvider')
    }
    return context
}
