import { useContext } from 'react'
import { useTaskContext } from '../../Contexts/TaskContext'
import TaskViewSectionContext from '../../Contexts/TaskViewSectionContext'
import {
    MakeAllTasksDoneButtonProps,
    TaskStatus,
} from '../../types/ButtonTypes'

const MakeAllTasksDoneButton = ({
    allTabIsSelected,
}: MakeAllTasksDoneButtonProps) => {
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
            className="tooltip hover:tooltip hover:tooltip-open hover:tooltip-success"
            data-tip="Mark all as done"
        >
            <button
                type="button"
                onClick={() => makeAllTasks('done')}
                className={`btn-success btn-sm btn-circle btn ${
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
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z" />
                </svg>
            </button>
        </div>
    )
}

export default MakeAllTasksDoneButton
