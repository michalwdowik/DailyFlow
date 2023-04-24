import { useContext } from 'react'
import TaskViewSectionContext from '../../Contexts/TaskViewSectionContext'
import Alert, { useAlertState } from '../../Components/Alert'
import RemoveDoneTasksButton from './RemoveDoneTasksButton'
import MakeAllTasksDoneButton from './MakeAllTasksDoneButton'
import UndoneAllTasksButton from './UndoneAllTasksButton'

const ToolbarButtons = () => {
    const { alertState, setAlertState } = useAlertState()
    const { selectedCategoryTab } = useContext(TaskViewSectionContext)
    const allTabIsSelected = selectedCategoryTab === 'all'

    return (
        <div className="flex self-center gap-1 ">
            <Alert alert={alertState} />
            <RemoveDoneTasksButton
                allTabIsSelected={allTabIsSelected}
                setAlertState={setAlertState}
            />
            <MakeAllTasksDoneButton allTabIsSelected={allTabIsSelected} />
            <UndoneAllTasksButton allTabIsSelected={allTabIsSelected} />
        </div>
    )
}
export default ToolbarButtons
