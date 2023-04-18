import React, { lazy, Suspense } from 'react'
import { ColorResult } from 'react-color'

type ColorPickerProps = {
    changeColorHandler: (color: ColorResult) => void
    color: string
}

const LazyCirclePicker = lazy(() =>
    import('react-color').then((module) => ({ default: module.CirclePicker }))
)

const ColorPicker = ({ color, changeColorHandler }: ColorPickerProps) => (
    <Suspense fallback={<div>Loading...</div>}>
        <LazyCirclePicker
            key={color}
            className="self-center p-0 m-0"
            color={color}
            colors={['#38bdf8', '#f87171', '#10b981', '#7e22ce', '#eab308']}
            onChangeComplete={changeColorHandler}
        />
    </Suspense>
)

export default ColorPicker
