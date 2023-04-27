import { useContext } from 'react'
import { useTaskContext } from '../../Contexts/TaskContext'
import TaskViewSectionContext from '../../Contexts/TaskViewSectionContext'
import { TaskStatus, ToolbarButtonsProps } from '../../types/types'

const UndoneAllTasksButton = ({ allTabIsSelected }: UndoneAllTasksButtonProps) => {
    const { taskList, setTaskList } = useTaskContext()
    const { selectedCategoryTab } = useContext(TaskViewSectionContext)

    const makeAllTasks = (status: TaskStatus) => {
        const updatedList = taskList.map((task) => {
            const taskBelongsToActiveTab =
                task.category === selectedCategoryTab || allTabIsSelected
            const isDone =
                (status === 'done' && taskBelongsToActiveTab) ||
                (status === 'notDone' && !taskBelongsToActiveTab)
            return { ...task, done: isDone }
        })
        setTaskList(updatedList)
    }

    return (
        <div
            className="tooltip hover:tooltip hover:tooltip-open hover:tooltip-primary"
            data-tip="Mark all as undone"
        >
            <button
                type="button"
                onClick={() => makeAllTasks('notDone')}
                className={`btn-primary btn-sm btn-circle btn ${
                    taskList.length === 0 && 'btn-disabled'
                }`}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 0 24 24"
                    width="24px"
                    fill="#FFFFFF"
                >
                    <path d="M0 0h24v24H0zm0 0h24v24H0V0z" fill="none" />
                    <path d="M1.79 12l5.58 5.59L5.96 19 .37 13.41 1.79 12zm.45-7.78L12.9 14.89l-1.28 1.28L7.44 12l-1.41 1.41L11.62 19l2.69-2.69 4.89 4.89 1.41-1.41L3.65 2.81 2.24 4.22zm14.9 9.27L23.62 7 22.2 5.59l-6.48 6.48 1.42 1.42zM17.96 7l-1.41-1.41-3.65 3.66 1.41 1.41L17.96 7z" />
                </svg>
            </button>
        </div>
    )
}

export default UndoneAllTasksButton

type UndoneAllTasksButtonProps = Pick<ToolbarButtonsProps, 'allTabIsSelected'>