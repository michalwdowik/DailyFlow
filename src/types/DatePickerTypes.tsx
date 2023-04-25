import { ColorStyleState } from '../helpers/colorStyleClassHandler'

export type DatePickerProps = {
    setTaskDeadline: (date: string) => void
    isSelectDateChecked: boolean
    setIsSelectDateChecked: (isChecked: boolean) => void
    colorStyle: ColorStyleState
}

export type TogglerLabelProps = {
    isToggled: boolean
}

export type TogglerInputProps = {
    isChecked: boolean
    action: () => void
}
