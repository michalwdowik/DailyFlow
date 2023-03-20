/* eslint-disable react/prop-types */
import React from "react";

export default function Button({
  toolTipClass,
  toolTipText,
  action,
  className,
  title,
}) {
  return (
    <div className={toolTipClass} data-tip={toolTipText}>
      <button onClick={action} type="button" className={className}>
        {title}
      </button>
    </div>
  );
}
