/* eslint-disable react/prop-types */
import React from "react";
import { colorStyleBgHandler } from "../colorStyleClassHandler";
import { useThemeContext } from "../ThemeContext";

export default function BackgroundBlobs() {
  const { colorStyle  } = useThemeContext()
  return (
    <div>
      <div className={`shape-blob one ${colorStyleBgHandler(colorStyle)}`} />
      <div className={`shape-blob ${colorStyleBgHandler(colorStyle)}`} />
    </div>
  );
}
