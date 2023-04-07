/* eslint-disable no-restricted-syntax */
/*
MAJOR: performance issues, they come from reloading whole app even if we just update select different activities category

/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
import React, { useState, useMemo } from 'react'
import { v4 as uuid } from 'uuid'
import TaskCreationSection from './TaskCreationSection/TaskCreationSection'
import TaskViewSection from './TaskViewSection/TaskViewSection'
import { MainContext } from './Contexts/Contexts'
import BackgroundBlobs from './Components/BackgroundBlobs'
import { ThemeContextProvider } from './Contexts/ThemeContext'

export default function App() {
    const [taskList, setTaskList] = useState([])
    const id = uuid()
    const addedCategoriesTab = useMemo(() => {
        const taskListCloned = [...taskList]
        // Segregate created tasks by category
        const tasksSegregatedByCategory = taskListCloned.reduce(
            (group, arr) => {
                const { category } = arr
                group[category] = group[category] ?? []
                group[category].push(arr)
                return group
            },
            {}
        )

        // Create added categories tab list with default 'all' category
        const addedCategoriesTabList = [
            {
                categoryName: 'all',
                categoryLength: 0,
                categoryIcon: 'IoListOutline',
                categoryUUID: id,
            },
        ]
        // Iterate over segregated tasks and convert them to Added Categories Tab List
        for (const [key, value] of Object.entries(tasksSegregatedByCategory)) {
            addedCategoriesTabList.push({
                categoryName: key,
                categoryLength: value.length,
                categoryIcon: value[0].icon,
                categoryColorStyle: value[0].colorStyle,
                categoryUUID: value[0].uuid,
            })
        }
        return addedCategoriesTabList
    }, [taskList.length])

    const value = useMemo(
        () => ({
            addedCategoriesTab,
            setTaskList,
            taskList,
        }),
        [addedCategoriesTab, taskList]
    )

    return (
        <div className="container min-w-full min-h-screen">
            <MainContext.Provider value={value}>
                <div className="grid gap-10 p-10 sm:grid-cols-1 lg:grid-cols-2">
                    <ThemeContextProvider>
                        <BackgroundBlobs />
                        <TaskCreationSection />
                    </ThemeContextProvider>
                    <TaskViewSection />
                </div>
            </MainContext.Provider>
        </div>
    )
}
