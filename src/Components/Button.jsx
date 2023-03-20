/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable react/button-has-type */

import React from "react";

export default function Button({toolTipClass, toolTipText, action, buttonType, className, title}) {
  
  return (
    <div
      className={toolTipClass}
      data-tip={toolTipText}
    >
      <button 
      onClick={action}
      type={buttonType}
    className={className}>
       {title}
      </button>
    </div>
  );
}
