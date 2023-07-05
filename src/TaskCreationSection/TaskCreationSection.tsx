import {
    useState,
    useRef,
    MutableRefObject,
    KeyboardEvent,
    MouseEvent,
} from 'react'
import { v4 as uuid } from 'uuid'
import AddTaskButton from './CategoryCreationSection/AddTaskButton'
import CategoryPicker from './CategoryPicker/CategoryPicker'
import DatePicker from './DatePicker'
import TaskImportance from './TaskImportance'
import AlertVariant from '../Helpers/AlertVariant'
import Alert, { showAlert, useAlertState } from '../Components/Alert'
import { useThemeContext } from '../Contexts/ThemeContext'
import { CategoryContextProvider } from '../Contexts/CategoryContext'
import { useTaskContext, defaultTask } from '../Contexts/TaskContext'
import scrollToBottom from '../Helpers/scrollToBottom'
import TextInput from '../Components/TextInput'
import { CategoryType } from '../types/types'

type InputRefType = MutableRefObject<HTMLInputElement | null>

const TaskCreationSection = () => {
    const { colorStyle, setColorStyle } = useThemeContext()
    const [newTask, setNewTask] = useState({
        ...defaultTask,
    })
    const { taskList, setTaskList, categoryTabs } = useTaskContext()
    const inputRef: InputRefType = useRef<HTMLInputElement>(null)
    const [isSelectDateChecked, setIsSelectDateChecked] = useState(false)
    const [isCorrectTyped, setIsCorrectTyped] = useState(true)
    const { alertState, setAlertState } = useAlertState()
    const maxCategoriesReached = categoryTabs.length >= 8
    const resetInput = () => {
        if (inputRef.current) {
            inputRef.current.value = ''
        }
    }

    const resetDeadline = () => {
        setNewTask({ ...newTask, deadline: 'Not specified' })
    }
    const submitHandler = (
        e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>
    ) => {
        e.preventDefault()
        const inputIsEmpty = inputRef.current?.value === ''
        if (inputIsEmpty) {
            setIsCorrectTyped(false)
            return
        }

        if (maxCategoriesReached) {
            showAlert(AlertVariant.ERROR_MAX_CATEGORIES_REACHED, setAlertState)
            return
        }

        setTaskList([
            ...taskList,
            {
                ...newTask,
                name: inputRef.current ? inputRef.current.value : '',
                uuid: uuid(),
            },
        ])
        scrollToBottom()
        resetDeadline()
        setIsSelectDateChecked(false)
        setIsCorrectTyped(true)
        resetInput()
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

    const changeTaskRate = (rate: number) => {
        setNewTask({ ...newTask, rate })
    }

    const toggleSetDeadline = () => {
        setIsSelectDateChecked(!isSelectDateChecked)
    }

    const changeDeadline = (deadline: string) => {
        setNewTask({ ...newTask, deadline })
    }
    return (
        <div className="relative flex flex-col self-start w-full p-5 glassmorphism-card gap-7">
            <span className="mt-2 -mb-6 label-text text-slate-700">
                Add Task:
            </span>
            <div className="flex w-5/6 gap-5 sm:w-4/6 md:w-4/6">
                <TextInput
                    darkBackground
                    maxChars={30}
                    inputRef={inputRef}
                    isInputCorrect={isCorrectTyped}
                    createNewCategory={submitHandler}
                />
                <AddTaskButton
                    submitHandler={submitHandler}
                    isCorrectTyped={isCorrectTyped}
                />
            </div>
            <CategoryContextProvider>
                <CategoryPicker
                    categoryColor={colorStyle}
                    selectedCategoryName={newTask.category}
                    onChangeCategory={(category: CategoryType) =>
                        handleCategoryChange(category)
                    }
                    resetCategorySelection={resetCategorySelection}
                />
            </CategoryContextProvider>
            <TaskImportance
                categoryColor={colorStyle}
                taskRate={newTask.rate}
                changeTaskRate={changeTaskRate}
            />

            <DatePicker
                colorStyle={colorStyle}
                changeDeadline={(deadline) => changeDeadline(deadline)}
                isSelectDateChecked={isSelectDateChecked}
                toggleSetDeadline={toggleSetDeadline}
            />

            <Alert alert={alertState} />
        </div>
    )
}

export default TaskCreationSection
