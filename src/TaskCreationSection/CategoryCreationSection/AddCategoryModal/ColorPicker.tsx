import { CirclePicker, ColorResult } from 'react-color'

type ColorPickerProps = {
    changeColorHandler: (color: ColorResult) => void
    color: string
}

const ColorPicker = ({ color, changeColorHandler }: ColorPickerProps) => (
    <CirclePicker
        key={color}
        className="self-center p-0 m-0"
        color={color}
        colors={['#38bdf8', '#f87171', '#10b981', '#7e22ce', '#eab308']}
        onChangeComplete={changeColorHandler}
    />
)

export default ColorPicker
