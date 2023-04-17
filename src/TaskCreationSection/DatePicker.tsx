/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react'
import Datepicker from 'tailwind-datepicker-react'
import { colorStyleTogglerHandler } from '../Helpers/colorStyleClassHandler'
import options from '../Helpers/datePickerOptions'

type DatePickerProps = {
    setTaskDeadline: (date: string) => void
    isSelectDateChecked: boolean
    setIsSelectDateChecked: (isChecked: boolean) => void
    colorStyle: string
}
const DatePicker = ({
    setTaskDeadline,
    isSelectDateChecked,
    setIsSelectDateChecked,
    colorStyle,
}: DatePickerProps) => {
    const today = new Date()
    const [show, setShow] = useState(false)
    const handleClose = () => {
        setShow(!show)
    }

    const handleDateChange = (selectedDate: Date) => {
        const formattedDate = selectedDate.toLocaleDateString('en-US')
        setTaskDeadline(formattedDate)
    }

    const setTodaysDate = () => {
        setIsSelectDateChecked(!isSelectDateChecked)
        const formattedDate = today.toLocaleDateString('en-US')
        setTaskDeadline(formattedDate)
    }

    return (
        <div className="relative flex flex-col gap-2 mb-2">
            <label className="relative inline-flex gap-3 cursor-pointer label-text ">
                <TogglerInput
                    isChecked={isSelectDateChecked}
                    action={setTodaysDate}
                />
                <div
                    className={`peer h-6 w-11 rounded-full transition-all ease-in-out after:absolute after:top-0.5 after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white 
          ${colorStyleTogglerHandler(
              colorStyle
          )} relative duration-150 bg-slate-700 dark:bg-slate-700 `}
                />

                <TogglerLabel isToggled={isSelectDateChecked} />
            </label>

            {isSelectDateChecked && (
                <Datepicker
                    options={options}
                    onChange={handleDateChange}
                    show={show}
                    setShow={handleClose}
                />
            )}
        </div>
    )
}
export default DatePicker

type TogglerLabelProps = {
    isToggled: boolean
}
const TogglerLabel = ({ isToggled }: TogglerLabelProps) => (
    <span
        className={`text-slate-700 ${isToggled ? 'opacity-50' : 'opacity-100'}`}
    >
        Set Deadline
    </span>
)

type TogglerInputProps = {
    isChecked: boolean
    action: () => void
}

const TogglerInput = ({ isChecked, action }: TogglerInputProps) => (
    <input
        type="checkbox"
        value=""
        className="sr-only peer "
        checked={isChecked}
        onChange={action}
    />
)
