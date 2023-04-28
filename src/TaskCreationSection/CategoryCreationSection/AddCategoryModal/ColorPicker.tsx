import { lazy, Suspense } from 'react'
import { ColorResult } from 'react-color'
import colors from '../../../Helpers/colors'

const LazyCirclePicker = lazy(() =>
    import('react-color').then((module) => ({ default: module.CirclePicker }))
)

const ColorPicker = ({ color, changeColorHandler }: ColorPickerProps) => (
    <Suspense fallback={<div>Loading...</div>}>
        <LazyCirclePicker
            key={color}
            className="self-center p-0 m-0"
            color={color}
            colors={colors}
            onChangeComplete={changeColorHandler}
        />
    </Suspense>
)

export default ColorPicker

type ColorPickerProps = {
    changeColorHandler: (color: ColorResult) => void
    color: string
}
