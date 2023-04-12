import { CirclePicker, ColorResult } from 'react-color'

type ColorPickerProps = {
    action: (color: ColorResult) => void
    color: string
}

function ColorPicker({ color, action }: ColorPickerProps) {
    return (
        <CirclePicker
            className="self-center p-0 m-0"
            color={color}
            colors={['#38bdf8', '#f87171', '#10b981', '#7e22ce', '#eab308']}
            onChangeComplete={action}
        />
    )
}

export default ColorPicker
