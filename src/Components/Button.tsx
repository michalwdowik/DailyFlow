/* eslint-disable react/require-default-props */
type ButtonProps = {
    toolTipClass?: string
    toolTipText?: string
    action: () => void
    className: string
    title: React.ReactNode | string
}
export default function Button({
    toolTipClass,
    toolTipText,
    action,
    className,
    title,
}: ButtonProps) {
    return (
        <div className={toolTipClass} data-tip={toolTipText}>
            <button type="button" onClick={action} className={className}>
                {title}
            </button>
        </div>
    )
}
