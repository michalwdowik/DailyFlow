import { ReactNode } from 'react'
import { useTaskContext } from '../../Contexts/TaskContext'

const BaseButton = ({
    action,
    tooltipInfo,
    buttonIcon,
    buttonStyle,
}: BaseButtonProps) => {
    const { taskList } = useTaskContext()

    return (
        <div
            className={`tooltip hover:tooltip hover:tooltip-open hover:tooltip-${buttonStyle} `}
            data-tip={tooltipInfo}
        >
            <button
                type="button"
                onClick={action}
                className={`btn-${buttonStyle} btn-sm btn-circle btn ${
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
