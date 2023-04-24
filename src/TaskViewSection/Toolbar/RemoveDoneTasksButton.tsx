import { useContext } from 'react'
import { showAlert } from '../../Components/Alert'
import AlertVariant from '../../helpers/AlertVariant'
import { useTaskContext } from '../../Contexts/TaskContext'
import TaskViewSectionContext from '../../Contexts/TaskViewSectionContext'
import { RemoveDoneTasksButtonProps } from '../../types/ButtonTypes'

const RemoveDoneTasksButton = ({
    allTabIsSelected,
    setAlertState,
}: RemoveDoneTasksButtonProps) => {
    const { taskList, setTaskList } = useTaskContext()
    const { selectedCategoryTab, setSelectedCategoryTab } = useContext(
        TaskViewSectionContext
    )

    const removeDoneTasksFromList = () =>
        setTaskList(taskList.filter((item) => !item.done))

    const removeTasksHandler = () => {
        const tabIsEmpty = taskList.some(
            (item) => item.category === selectedCategoryTab
        )
        const anyTaskIsDone = taskList.some((task) => task.done)
        const doneTasksInActiveTab = taskList.filter(
            (task) => task.category === selectedCategoryTab && task.done
        )

        if (tabIsEmpty) setSelectedCategoryTab('all')

        if (
            (allTabIsSelected && anyTaskIsDone) ||
            doneTasksInActiveTab.length > 0
        ) {
            removeDoneTasksFromList()

            showAlert(AlertVariant.SUCCESS_DONE_TASKS_REMOVED, setAlertState)
        } else {
            showAlert(AlertVariant.ERROR_NO_DONE_TASKS, setAlertState)
        }
    }
    return (
        <div
            className="hover:tooltip-error hover:tooltip hover:tooltip-open"
            data-tip="Remove Done Tasks"
        >
            <button
                type="button"
                onClick={removeTasksHandler}
                className={`btn-error btn-sm btn-circle btn ${
                    taskList.length === 0 && 'btn-disabled'
                }`}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#FFFFFF"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                </svg>
            </button>
        </div>
    )
}

export default RemoveDoneTasksButton
