import { AlertType } from './AlertTypes'

export type TaskStatus = 'done' | 'notDone'

export type RemoveDoneTasksButtonProps = {
    allTabIsSelected: boolean
    setAlertState: React.Dispatch<React.SetStateAction<Partial<AlertType>>>
}

export type MakeAllTasksDoneButtonProps = Pick<
    RemoveDoneTasksButtonProps,
    'allTabIsSelected'
>
