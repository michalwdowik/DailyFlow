/* eslint-disable react/prop-types */
import { createContext, useMemo, useState, useContext } from 'react'

const ThemeContext = createContext({
    colorStyle: 'info',
})

export function ThemeContextProvider({ children }) {
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
