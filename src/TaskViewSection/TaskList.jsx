/* eslint-disable consistent-return */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
import React, { useContext, useMemo, useState } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import Task from './Task'
import {
    MainContext,
    ViewSectionContext,
    ToolbarContext,
} from '../Contexts/Contexts'
import ToolBar from './Toolbar/ToolBar'

export default function TaskList() {
    const { taskList, setTaskList, addedCategoriesTab } =
        useContext(MainContext)
    const { selectedTabCategory } = useContext(ViewSectionContext)
    const [searchInput, setSearchInput] = useState('')
    const [animationParent] = useAutoAnimate({
        duration: 100,
        easing: 'ease-in-out',
        disrespectUserMotionPreference: false,
    })
    const onInput = (e) => {
        setSearchInput(e.target.value)
    }

    const updateStatusHandler = (e, index) => {
        const newList = [...taskList]
        newList[index].done = e.target.checked
        setTaskList(newList)
    }

    const getColor = () => {
        let color
        for (const category of Object.values(addedCategoriesTab)) {
            if (category.category === selectedTabCategory) {
                color = category.categoryColorStyle
            }
        }
        return color
    }

    const value = useMemo(
        () => ({
            onInput,
            searchInput,
            getColor,
        }),
        [searchInput, getColor, onInput]
    )

    return (
        <div className="w-5/6 pb-5 sm:w-4/6 md:w-1/2 lg:w-5/6">
            <ToolbarContext.Provider value={value}>
                <ToolBar />
            </ToolbarContext.Provider>

            <div className="flow-root ">
                <ul
                    ref={animationParent}
                    className={`mt-3 max-h-[550px] ${
                        taskList.length > 8 && 'overflow-y-scroll'
                    } p-0`}
                >
                    <CallToActionLabel taskListLength={taskList.length} />
                    {taskList.map((task, index) => (
                        <Task
                            searchInput={searchInput}
                            key={task.id}
                            onChange={(e) => updateStatusHandler(e, index)}
                            task={task}
                        />
                    ))}
                </ul>
            </div>
        </div>
    )
}

const CallToActionLabel = ({ taskListLength }) => {
    if (taskListLength === 0)
        return (
            <h1 className="mt-10 text-3xl text-center duration-500 transition-color animate-pulse opacity-70 hover:text-success">
                Add some tasks!
            </h1>
        )
}
