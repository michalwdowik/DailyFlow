import { colorStyleBgHandler } from '../helpers/colorStyleClassHandler'
import { useThemeContext } from '../Contexts/ThemeContext'

const BackgroundBlobs = (): JSX.Element => {
    const { colorStyle } = useThemeContext()
    return (
        <div>
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
        </div>
    )
}

export default BackgroundBlobs
