/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
import { useContext } from 'react'
import Button from '../../Components/Button'
import { TaskViewSectionContext } from '../../Contexts/Contexts'
import { useTaskContext } from '../../Contexts/TaskContext'
import Alert, {
    showAlert,
    AlertVariant,
    useAlertState,
} from '../../Components/Alert'

export default function ToolbarButtons() {
    const { alertState, setAlertState } = useAlertState()
    const { taskList, setTaskList } = useTaskContext()
    const { selectedCategoryTab, setSelectedCategoryTab } = useContext(
        TaskViewSectionContext
    )
    const allTabIsSelected = selectedCategoryTab === 'all'

    const removeTaskFromList = () =>
        setTaskList(taskList.filter((item) => item.done !== true))

    const isAnyDone = taskList.some((task) => task.done)

    const removeTasksHandler = () => {
        for (const task of taskList) {
            const belongsToActiveTab = task.category === selectedCategoryTab
            const isDone = task.done === true
            const tabEmpty = taskList.some(
                (item) => item.category === selectedCategoryTab
            )
            if (
                (allTabIsSelected && isAnyDone) ||
                (belongsToActiveTab && isDone)
            ) {
                removeTaskFromList()

                if (tabEmpty) {
                    setSelectedCategoryTab('all')
                }

                showAlert(
                    AlertVariant.SUCCESS_DONE_TASKS_REMOVED,
                    setAlertState
                )
            } else {
                showAlert(AlertVariant.ERROR_NO_DONE_TASKS, setAlertState)
            }
        }
    }

    const giveAllTasks = (status: TaskStatus) => {
        const newList = [...taskList]
        taskList.forEach((task) => {
            const belongsToActiveTab = task.category === selectedCategoryTab
            if (status === 'done')
                if (belongsToActiveTab || allTabIsSelected) task.done = true
            if (status === 'notDone')
                if (belongsToActiveTab || allTabIsSelected) task.done = false
        })
        setTaskList(newList)
    }

    return (
        <div className="flex self-center gap-1 ">
            <Alert alert={alertState} />
            <RemoveDoneTasksButton action={removeTasksHandler} />
            <MakeAllTasksDoneButton action={() => giveAllTasks('done')} />
            <UndoneAllTasksButton action={() => giveAllTasks('notDone')} />
        </div>
    )
}
type TaskStatus = 'done' | 'notDone'

type ActionType = {
    action: (all: TaskStatus) => void
}

function RemoveDoneTasksButton({ action }: ActionType) {
    const { taskList } = useTaskContext()

    return (
        <Button
            toolTipClass="hover:tooltip-error hover:tooltip hover:tooltip-open"
            toolTipText="Remove Done Tasks"
            action={action}
            className={`btn-error btn-sm btn-circle btn ${
                taskList.length === 0 && 'btn-disabled'
            }`}
            title={
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
            }
        />
    )
}
function MakeAllTasksDoneButton({ action }: ActionType) {
    const { taskList } = useTaskContext()

    return (
        <Button
            toolTipClass="tooltip hover:tooltip hover:tooltip-open hover:tooltip-success"
            toolTipText="Mark all as done"
            action={action}
            className={`btn-success btn-sm btn-circle btn ${
                taskList.length === 0 && 'btn-disabled'
            }`}
            title={
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
            }
        />
    )
}

function UndoneAllTasksButton({ action }: ActionType) {
    const { taskList } = useTaskContext()

    return (
        <Button
            toolTipClass="tooltip hover:tooltip hover:tooltip-open hover:tooltip-primary"
            toolTipText="Mark all as undone"
            action={action}
            className={`btn-primary btn-sm btn-circle btn ${
                taskList.length === 0 && 'btn-disabled'
            }`}
            title={
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
            }
        />
    )
}
