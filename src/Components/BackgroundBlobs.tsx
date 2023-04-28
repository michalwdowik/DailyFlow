import { useThemeContext } from '../Contexts/ThemeContext'
import { colorStyleBgHandler } from '../Helpers/colorStyleClassHandler'

const BackgroundBlobs = (): JSX.Element => {
    const { colorStyle } = useThemeContext()
    return (
        <>
            <div
                className={`shape-blob one transition-colors duration-500 ease-in-out ${colorStyleBgHandler(
                    colorStyle
                )}`}
            />
            <div
                className={`shape-blob transition-colors duration-500 ease-in-out ${colorStyleBgHandler(
                    colorStyle
                )}`}
            />
        </>
    )
}

export default BackgroundBlobs
