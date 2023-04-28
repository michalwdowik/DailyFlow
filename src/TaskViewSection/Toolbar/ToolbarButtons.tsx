import { useContext } from 'react'
import TaskViewSectionContext from '../../Contexts/TaskViewSectionContext'
import Alert, { useAlertState } from '../../Components/Alert'
import RemoveDoneTasksButton from './RemoveDoneTasksButton'
import MakeAllTasksDoneButton from './MakeAllTasksDoneButton'
import UndoneAllTasksButton from './UndoneAllTasksButton'
import { useTaskContext } from '../../Contexts/TaskContext'
import { TaskStatus } from '../../types/types'

const ToolbarButtons = () => {
    const { alertState, setAlertState } = useAlertState()
    const { selectedCategoryTab } = useContext(TaskViewSectionContext)
    const allTabIsSelected = selectedCategoryTab === 'all'

    const { taskList, setTaskList } = useTaskContext()

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
        <div className="flex self-center gap-1 ">
            <Alert alert={alertState} />
            <RemoveDoneTasksButton
                allTabIsSelected={allTabIsSelected}
                setAlertState={setAlertState}
            />
            <MakeAllTasksDoneButton action={() => makeAllTasks('done')} />
            <UndoneAllTasksButton action={() => makeAllTasks('notDone')} />
        </div>
    )
}
export default ToolbarButtons
