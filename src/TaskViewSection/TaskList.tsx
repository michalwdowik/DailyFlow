import { ChangeEvent, useState } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import Task from './Task'
import ToolBar from './Toolbar/ToolBar'
import { useTaskContext } from '../Contexts/TaskContext'

const TaskList = () => {
    const { taskList, setTaskList } = useTaskContext()
    const [searchInput, setSearchInput] = useState('')

    const searchTasksOnInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value)
    }
    const [animationParent] = useAutoAnimate({
        duration: 200,
        easing: 'ease-in-out',
    })

    const updateTasksStatus = (
        e: React.ChangeEvent<HTMLInputElement>,
        taskId: string
    ) => {
        setTaskList((prevList) =>
            prevList.map((task) =>
                task.uuid === taskId
                    ? { ...task, done: e.target.checked }
                    : task
            )
        )
    }

    const scrollIfOverflow = taskList.length > 8 && 'overflow-y-scroll'
    return (
        <div className="w-5/6 pb-5 sm:w-4/6 md:w-1/2 lg:w-5/6">
            <ToolBar
                searchInput={searchInput}
                searchTasksOnInput={searchTasksOnInput}
            />
            <div className="flow-root ">
                {taskList.length === 0 && <CallToActionLabel />}
                <ul
                    ref={animationParent}
                    className={`mt-3 max-h-[500px] ${scrollIfOverflow} p-0`}
                >
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
        <h2 className="mt-10 text-3xl text-center duration-500 text-slate-600 loop-scale transition-color animate-pulse opacity-70 hover:text-success">
            Add some tasks...
        </h2>
    )
}
