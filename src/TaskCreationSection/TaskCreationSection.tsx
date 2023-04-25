import { useState, useRef, MutableRefObject } from 'react'
import { v4 as uuid } from 'uuid'
import AddTaskButton from './CategoryCreationSection/AddTaskButton'
import CategoryPicker from './CategoryPicker/CategoryPicker'
import DatePicker from './DatePicker'
import TaskImportance from './TaskImportance'
import AlertVariant from '../helpers/AlertVariant'
import Alert, { showAlert, useAlertState } from '../Components/Alert'
import { useThemeContext } from '../Contexts/ThemeContext'
import { CategoryContextProvider } from '../Contexts/CategoryContext'
import { useTaskContext, defaultTask } from '../Contexts/TaskContext'
import scrollToBottom from '../helpers/scrollToBottom'
import TextInput from '../Components/TextInput'
import { CategoryType } from '../types/CategoryTypes'

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
    const submitHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
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

    return (
        <div className="relative flex flex-col self-start w-full p-5 glassmorphismCard gap-7">
            <span className="mt-2 -mb-6 label-text text-slate-700">
                Add Task:
            </span>
            <div className="flex w-5/6 gap-5 sm:w-4/6 md:w-4/6">
                <TextInput
                    darkBackground
                    maxChars={30}
                    inputRef={inputRef}
                    isInputCorrect={isCorrectTyped}
                    action={submitHandler}
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
                setTaskRate={(rate) => setNewTask({ ...newTask, rate })}
            />

            <DatePicker
                colorStyle={colorStyle}
                setTaskDeadline={(deadline) =>
                    setNewTask({ ...newTask, deadline })
                }
                isSelectDateChecked={isSelectDateChecked}
                setIsSelectDateChecked={setIsSelectDateChecked}
            />

            <Alert alert={alertState} />
        </div>
    )
}

export default TaskCreationSection
