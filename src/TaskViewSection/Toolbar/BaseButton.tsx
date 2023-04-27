import { ReactNode } from 'react'
import { useTaskContext } from '../../Contexts/TaskContext'

const BaseButton = ({
    action,
    tooltipInfo,
    buttonIcon,
    buttonStyle,
}: BaseButtonProps) => {
    const { taskList } = useTaskContext()

    const buttonColorClass =
        (buttonStyle === 'success' && 'btn-success') ||
        (buttonStyle === 'error' && 'btn-error') ||
        (buttonStyle === 'primary' && 'btn-primary')

    const tooltipColorClass =
        (buttonStyle === 'success' && 'hover:tooltip-success') ||
        (buttonStyle === 'error' && 'hover:tooltip-error') ||
        (buttonStyle === 'primary' && 'hover:tooltip-primary')

    return (
        <div
            className={`tooltip hover:tooltip hover:tooltip-open ${tooltipColorClass} `}
            data-tip={tooltipInfo}
        >
            <button
                type="button"
                onClick={action}
                className={`${buttonColorClass} btn-sm btn-circle btn ${
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
