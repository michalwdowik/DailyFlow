import { ReactNode } from 'react'
import { useTaskContext } from '../../Contexts/TaskContext'
import {
    buttonColorClass,
    tooltipColorClass,
} from '../../Helpers/colorStyleClassHandler'

const BaseButton = ({
    action,
    tooltipInfo,
    buttonIcon,
    buttonStyle,
}: BaseButtonProps) => {
    const { taskList } = useTaskContext()

    return (
        <div
            className={`tooltip hover:tooltip hover:tooltip-open ${tooltipColorClass(
                buttonStyle
            )} `}
            data-tip={tooltipInfo}
        >
            <button
                id={`${
                    (buttonStyle === 'success' && 'makeAllTasksDone') ||
                    (buttonStyle === 'error' && 'removeAllTasks') ||
                    (buttonStyle === 'primary' && 'makeAllTasksUndone')
                }`}
                aria-label={`${
                    (buttonStyle === 'success' &&
                        'Make all tasks done button') ||
                    (buttonStyle === 'error' && 'Remove done tasks button') ||
                    (buttonStyle === 'primary' &&
                        'Make all tasks not done button')
                }`}
                type="button"
                onClick={action}
                className={`${buttonColorClass(
                    buttonStyle
                )} btn-sm btn-circle btn ${
                    taskList.length === 0 && 'btn-disabled'
                }`}
            >
                {buttonIcon}
            </button>
        </div>
    )
}
export default BaseButton

type BaseButtonProps = {
    action: () => void
    tooltipInfo: string
    buttonStyle: ButtonStyleType
    buttonIcon: ReactNode
}

type ButtonStyleType = 'success' | 'primary' | 'error'
