/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable prettier/prettier */
import React, { useState } from "react";

export default function TimePicker({hour, aMpM, minutes, setHour, setMinutes, setAmPm}) {

  const handleChangeHours = (e) => {
    setHour(e.target.value);
  };

  const handleChangeMinutes = (e) => {
    setMinutes(e.target.value);
  };

  const handleChangeAmPm = (e) => {
    setAmPm(e.target.value);
  };

  
  return (
    <div>

{/* <div className="dropdown">
  <label tabIndex={0} className="m-1 btn">Click</label>
  <ul tabIndex={0} className="p-2 shadow dropdown-content menu bg-base-100 rounded-box w-52">
    <li><a>1</a></li>
    <li><a>2</a></li>
    <li><a>3</a></li>
    <li><a>4</a></li>
    <li><a>5</a></li>
    <li><a>6</a></li>
    <li><a>7</a></li>
    <li><a>8</a></li>
    <li><a>9</a></li>
    <li><a>10</a></li>
    <li><a>11</a></li>
    <li><a>12</a></li>
  </ul>
</div> */}

{/* {console.log(`${hour}:${minutes} ${aMpM}`)} */}

      <div className="p-2 text-white bg-gray-700 border border-gray-600 rounded-lg ">
        <div className="flex">
          <select
          value={hour} 
          onChange={handleChangeHours} 
            name="hours"
            className="bg-transparent outline-none appearance-none text-md "
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">10</option>
            <option value="12">12</option>
          </select>
          <span className="mr-3 text-xl">:</span>
          <select
             value={minutes} 
             onChange={handleChangeMinutes} 
            name="minutes"
            className="mr-4 bg-transparent outline-none appearance-none text-md"
          >
            <option value="0">00</option>
            <option value="15">15</option>
            <option value="30">30</option>
            <option value="45">45</option>
          </select>
          <select
             value={aMpM} 
             onChange={handleChangeAmPm} 
            name="ampm"
            className="bg-transparent outline-none appearance-none text-md"
          >
            <option value="am">AM</option>
            <option value="pm">PM</option>
          </select>
        </div>
      </div>
    </div>
  );
}
