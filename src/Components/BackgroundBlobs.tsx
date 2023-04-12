import { colorStyleBgHandler } from '../colorStyleClassHandler'
import { useThemeContext } from '../Contexts/ThemeContext'

export default function BackgroundBlobs(): JSX.Element {
    const { colorStyle } = useThemeContext()
    return (
        <div>
            <div
                className={`shape-blob one ${colorStyleBgHandler(colorStyle)}`}
            />
            <div className={`shape-blob ${colorStyleBgHandler(colorStyle)}`} />
        </div>
    )
}
