/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useState } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import Task from './Task'
import ToolBar from './Toolbar/ToolBar'
import { useTaskContext } from '../Contexts/TaskContext'

const TaskList = () => {
    const { taskList, setTaskList } = useTaskContext()
    const [searchInput, setSearchInput] = useState('')

    const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value)
    }
    const [animationParent] = useAutoAnimate({
        duration: 150,
        easing: 'ease-out',
    })

    const updateTasksStatus = (
        e: React.ChangeEvent<HTMLInputElement>,
        taskId: string
    ) => {
        const taskIndex = taskList.findIndex((task) => task.uuid === taskId)
        if (taskIndex !== -1) {
            const newList = [...taskList]
            newList[taskIndex] = {
                ...newList[taskIndex],
                done: e.target.checked,
            }
            setTaskList(newList)
        }
    }

    const scrollIfOverflow = taskList.length > 8 && 'overflow-y-scroll'
    return (
        <div className="w-5/6 pb-5 sm:w-4/6 md:w-1/2 lg:w-5/6">
            <ToolBar searchInput={searchInput} onInput={onInput} />
            <div className="flow-root ">
                <ul
                    ref={animationParent}
                    className={`mt-3 max-h-[550px] ${scrollIfOverflow} p-0`}
                >
                    {taskList.length === 0 && <CallToActionLabel />}
                    {taskList.map((task) => (
                        <Task
                            searchInput={searchInput}
                            key={task.uuid}
                            updateTaskStatus={(
                                e: ChangeEvent<HTMLInputElement>
                            ) => updateTasksStatus(e, task.uuid)}
                            task={task}
                        />
                    ))}
                </ul>
            </div>
        </div>
    )
}
export default TaskList

const CallToActionLabel = () => {
    return (
        <h1 className="mt-10 text-3xl text-center duration-500 loop-scale transition-color animate-pulse opacity-70 hover:text-success">
            Add some tasks...
        </h1>
    )
}
