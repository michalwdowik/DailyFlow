/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useMemo, useState } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import Task from './Task'
import { ToolbarContext } from '../Contexts/Contexts'
import ToolBar from './Toolbar/ToolBar'
import { useTaskContext } from '../Contexts/TaskContext'

export default function TaskList() {
    const { taskList, setTaskList } = useTaskContext()
    const [searchInput, setSearchInput] = useState('')
    const [animationParent] = useAutoAnimate({
        duration: 100,
        easing: 'ease-in-out',
        disrespectUserMotionPreference: false,
    })
    const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value)
    }

    const updateStatusHandler = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const newList = [...taskList]
        newList[index].done = e.target.checked
        setTaskList(newList)
    }

    const value = useMemo(
        () => ({
            onInput,
            searchInput,
        }),
        [searchInput, onInput]
    )

    const scrollIfOverflow = taskList.length > 8 && 'overflow-y-scroll'
    return (
        <div className="w-5/6 pb-5 sm:w-4/6 md:w-1/2 lg:w-5/6">
            <ToolbarContext.Provider value={value}>
                <ToolBar />
            </ToolbarContext.Provider>

            <div className="flow-root ">
                <ul
                    ref={animationParent}
                    className={`mt-3 max-h-[550px] ${scrollIfOverflow} p-0`}
                >
                    <CallToActionLabel taskListLength={taskList.length} />
                    {taskList.map((task, index) => (
                        <Task
                            searchInput={searchInput}
                            key={task.uuid}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                updateStatusHandler(e, index)
                            }
                            task={task}
                        />
                    ))}
                </ul>
            </div>
        </div>
    )
}

type CallToActionLabelProps = {
    taskListLength: number
}

function CallToActionLabel({ taskListLength }: CallToActionLabelProps) {
    const noTasksAdded = taskListLength === 0
    if (noTasksAdded) {
        return (
            <h1 className="mt-10 text-3xl text-center duration-500 transition-color animate-pulse opacity-70 hover:text-success">
                Add some tasks!
            </h1>
        )
    }
    return null
}
