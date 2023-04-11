/* eslint-disable react/prop-types */

export default function Button({
    toolTipClass,
    toolTipText,
    action,
    className,
    title,
}) {
    return (
        <div className={toolTipClass} data-tip={toolTipText}>
            <button type="button" onClick={action} className={className}>
                {title}
            </button>
        </div>
    )
}
