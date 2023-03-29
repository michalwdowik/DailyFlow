/* eslint-disable react/prop-types */
import React from "react";
import { colorStyleBgHandler } from "../colorStyleClassHandler";

export default function BackgroundBlobs({ colorStyle }) {
  return (
    <div>
      <div className={`shape-blob one ${colorStyleBgHandler(colorStyle)}`} />
      <div className={`shape-blob ${colorStyleBgHandler(colorStyle)}`} />
    </div>
  );
}
