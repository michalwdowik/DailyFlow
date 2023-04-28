/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react'
import Datepicker from 'tailwind-datepicker-react'
import options from '../Helpers/datePickerOptions'
import {
    ColorStyleState,
    colorStyleTogglerHandler,
} from '../Helpers/colorStyleClassHandler'

const DatePicker = ({
    changeDeadline,
    isSelectDateChecked,
    toggleSetDeadline,
    colorStyle,
}: DatePickerProps) => {
    const today = new Date()
    const [show, setShow] = useState(false)
    const handleClose = () => {
        setShow(!show)
    }

    const handleDateChange = (selectedDate: Date) => {
        const formattedDate = selectedDate.toLocaleDateString('en-US')
        changeDeadline(formattedDate)
    }

    const setTodaysDate = () => {
        toggleSetDeadline()
        const formattedDate = today.toLocaleDateString('en-US')
        changeDeadline(formattedDate)
    }

    return (
        <div className="relative flex flex-col gap-2 mb-2 ">
            <label className="relative inline-flex gap-3 cursor-pointer label-text ">
                <TogglerInput
                    isSelectDateChecked={isSelectDateChecked}
                    setTodaysDate={setTodaysDate}
                />
                <div
                    className={`peer h-6 w-11 rounded-full transition-all ease-in-out after:absolute after:top-0.5 after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white 
          ${colorStyleTogglerHandler(
              colorStyle
          )} relative duration-150 bg-slate-700 dark:bg-slate-700 `}
                />

                <TogglerLabel isSelectDateChecked={isSelectDateChecked} />
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

const TogglerLabel = ({ isSelectDateChecked }: TogglerLabelProps) => (
    <span
        className={`transition-all duration-200 text-slate-700 ${
            isSelectDateChecked ? 'opacity-30' : 'opacity-100'
        }`}
    >
        Set Deadline
    </span>
)

const TogglerInput = ({
    isSelectDateChecked,
    setTodaysDate,
}: TogglerInputProps) => (
    <input
        type="checkbox"
        value=""
        className="sr-only peer "
        checked={isSelectDateChecked}
        onChange={setTodaysDate}
    />
)

type DatePickerProps = {
    changeDeadline: (date: string) => void
    isSelectDateChecked: boolean
    toggleSetDeadline: () => void
    colorStyle: ColorStyleState
}

type TogglerLabelProps = {
    isSelectDateChecked: boolean
}

type TogglerInputProps = {
    isSelectDateChecked: boolean
    setTodaysDate: () => void
}
