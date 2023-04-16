/* eslint-disable @typescript-eslint/no-explicit-any */
type ButtonProps = {
    toolTipClass?: string
    toolTipText?: string
    action: (...args: any[]) => void
    className: string
    title: React.ReactNode | string
}
const Button = ({
    toolTipClass,
    toolTipText,
    action,
    className,
    title,
}: ButtonProps) => {
    return (
        <div className={toolTipClass} data-tip={toolTipText}>
            <button type="button" onClick={action} className={className}>
                {title}
            </button>
        </div>
    )
}

export default Button
