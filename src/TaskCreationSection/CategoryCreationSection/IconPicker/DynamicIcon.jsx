/* eslint-disable react/prop-types */
import React from "react";
import * as Icons from "react-icons/all";

export default function DynamicIcon({ name }) {
  const IconComponent = Icons[name];

  if (!IconComponent) {
    return <Icons.FaBeer />;
  }
  return <IconComponent />;
}
