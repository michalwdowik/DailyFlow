import { AlertType } from '../Components/Alert'

export type TaskStatus = 'done' | 'notDone'
export type MakeAllTasksDoneButtonProps = {
    allTabIsSelected: boolean
}
export type RemoveDoneTasksButtonProps = {
    allTabIsSelected: boolean
    setAlertState: React.Dispatch<React.SetStateAction<AlertType>>
}
