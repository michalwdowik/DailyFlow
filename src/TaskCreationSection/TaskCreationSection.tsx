/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState, useRef, MutableRefObject } from 'react'
import { v4 as uuid } from 'uuid'
import Button from '../Components/Button'
import CategoryPicker from './CategoryPicker/CategoryPicker'
import DatePicker from './DatePicker'
import Importance from './Importance'
import Alert, { AlertType, AlertVariant, showAlert } from '../Components/Alert'
import { useThemeContext } from '../Contexts/ThemeContext'
import {
    CategoryContextProvider,
    CategoryType,
} from '../Contexts/CategoryContext'
import { useTaskContext, TaskType } from '../Contexts/TaskContext'

type InputRefType = MutableRefObject<HTMLInputElement | null>

export default function TaskCreationSection() {
    const { colorStyle, setColorStyle } = useThemeContext()
    const defaultTask = {
        name: '',
        category: 'general',
        done: false,
        rate: 2,
        deadline: 'Not specified',
        icon: 'IoDocuments',
        colorStyle,
    }
    const [newTask, setNewTask] = useState({
        ...defaultTask,
    })
    const { taskList, setTaskList, categoryTabs } = useTaskContext()
    const inputRef: InputRefType = useRef<HTMLInputElement>(null)
    const [isSelectDateChecked, setIsSelectDateChecked] = useState(false)
    const [isCorrectTyped, setIsCorrectTyped] = useState(true)
    const [alert, setAlert] = useState<AlertType>({
        title: '',
        type: '',
        background: '',
        isShowed: false,
    })
    const maxCategoriesReached = categoryTabs.length >= 8

    const submitHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault()

        if (inputRef.current?.value === '') {
            setIsCorrectTyped(false)
            return
        }
        if (maxCategoriesReached) {
            showAlert(AlertVariant.ERROR_MAX_CATEGORIES_REACHED, setAlert)
            return
        }

        const addTaskToList = (task: TaskType) => {
            setTaskList([...taskList, task])
        }

        addTaskToList({
            ...newTask,
            name: inputRef.current!.value,
            uuid: uuid(),
        })

        inputRef.current!.value = ''
        setIsSelectDateChecked(false)
        setIsCorrectTyped(true)
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            submitHandler(e)
        }
    }

    const handleCategoryChange = (category: CategoryType) => {
        setNewTask({
            ...newTask,
            category: category.name,
            icon: category.icon,
            colorStyle: category.colorStyle,
        })
        setColorStyle(category.colorStyle)
    }

    const resetCategorySelection = () => {
        setColorStyle('info')
        setNewTask(defaultTask)
    }

    return (
        <div className="relative flex flex-col w-full p-5 glassmorphismCard gap-7 ">
            <span className="mt-2 -mb-6 label-text text-slate-700">
                Add Task:
            </span>
            <div className="flex w-5/6 gap-5 sm:w-4/6 md:w-4/6">
                <TaskInput
                    action={handleKeyPress}
                    maxLength={30}
                    inputRef={inputRef}
                    isCorrectTyped={isCorrectTyped}
                />
                <AddTaskButton
                    action={submitHandler}
                    isCorrectTyped={isCorrectTyped}
                />
            </div>
            <CategoryContextProvider>
                <CategoryPicker
                    colorStyle={colorStyle}
                    selectedCategoryName={newTask.category}
                    onChangeCategory={(category: CategoryType) =>
                        handleCategoryChange(category)
                    }
                    resetCategorySelection={resetCategorySelection}
                />
            </CategoryContextProvider>
            <Importance
                colorStyle={colorStyle}
                rate={newTask.rate}
                setRate={(rate) => setNewTask({ ...newTask, rate })}
            />
            <DatePicker
                colorStyle={colorStyle}
                setTaskDeadline={(deadline) =>
                    setNewTask({ ...newTask, deadline })
                }
                isSelectDateChecked={isSelectDateChecked}
                setIsSelectDateChecked={setIsSelectDateChecked}
            />
            <Alert alert={alert} />
        </div>
    )
}
type TaskInputProps = {
    action: (e: React.KeyboardEvent<HTMLInputElement>) => void
    maxLength: number
    inputRef: InputRefType
    isCorrectTyped: boolean
}

function TaskInput({
    action,
    maxLength,
    inputRef,
    isCorrectTyped,
}: TaskInputProps) {
    const isEmpty = inputRef.current?.value !== ''
    const colorInputBorder = () => {
        return !isCorrectTyped
            ? 'input-error'
            : 'input' && isEmpty && 'focus:input-success'
    }
    return (
        <input
            onKeyDown={action}
            maxLength={maxLength}
            ref={inputRef}
            type="text"
            placeholder="Type here..."
            id="taskInput"
            className={`input w-full rounded-3xl bg-base-300  
      ${colorInputBorder()}`}
        />
    )
}

type AddTaskButtonProps = {
    action: (e: React.KeyboardEvent<HTMLInputElement>) => void
    isCorrectTyped: boolean
}
function AddTaskButton({ action, isCorrectTyped }: AddTaskButtonProps) {
    const buzzIfTaskNotValid = () => {
        return !isCorrectTyped && 'buzz-effect'
    }
    return (
        <Button
            className={`btn-m btn-circle btn ${buzzIfTaskNotValid()}`}
            action={action}
            title={
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                    />
                </svg>
            }
        />
    )
}
