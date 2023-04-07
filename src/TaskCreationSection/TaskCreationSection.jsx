/* eslint-disable no-use-before-define */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
import React, { useState, useContext, useRef } from 'react'
import { v4 as uuid } from 'uuid'
import Button from '../Components/Button'
import CategoryPicker from './CategoryPicker/CategoryPicker'
import DatePicker from './DatePicker'
import Importance from './Importance'
import { MainContext } from '../Contexts/Contexts'
import Alert from '../Components/Alert'
import { useThemeContext } from '../Contexts/ThemeContext'
import { CategoryContextProvider } from '../Contexts/CategoryContext'

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
    const { taskList, setTaskList, addedCategoriesTab } =
        useContext(MainContext)
    const inputRef = useRef('')
    const [isSelectDateChecked, setIsSelectDateChecked] = useState(false)
    const [isCorrectTyped, setIsCorrectTyped] = useState(true)
    const [alert, setAlert] = useState({})

    const showAlert = (alertData) => {
        setAlert({
            title: alertData.title,
            type: alertData.type,
            background: alertData.background,
            isShowed: alertData.isShowed,
        })
        setTimeout(() => {
            setAlert({ isShowed: false })
        }, 3000)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if (inputRef.current.value === '') {
            setIsCorrectTyped(false)
            return
        }
        if (addedCategoriesTab.length >= 8) {
            showAlert({
                title: 'You can add tasks of 8 different categories at a time ',
                type: 'error',
                background: 'bg-error',
                isShowed: true,
            })
            return
        }
        // addTask from context

        const addTaskToList = (task) => {
            setTaskList([...taskList, task])
        }

        addTaskToList({ ...newTask, name: inputRef.current.value, id: uuid() })

        inputRef.current.value = ''
        setIsSelectDateChecked(false)
        setIsCorrectTyped(true)
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            submitHandler(e)
        }
    }

    const handleCategoryChange = (category) => {
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
                    onChangeCategory={(category) =>
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

function TaskInput({ action, maxLength, inputRef, isCorrectTyped }) {
    const colorInputBorder = () => {
        return !isCorrectTyped
            ? 'input-error'
            : 'input' && inputRef !== '' && 'focus:input-success'
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

function AddTaskButton({ action, isCorrectTyped }) {
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
