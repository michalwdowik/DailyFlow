/* eslint-disable react/prop-types */
import React from "react";
import { Transition } from "@headlessui/react";

export default function Alert({ title, type, backgroundGradient, isShowed }) {
  return (
    <Transition
      show={isShowed}
      enter="transition-opacity duration-150"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {/* showAlert(tittle, type, backgroundGradient, true ) */}
      <div
        className={`alert absolute inset-x-0 top-0 w-4/6 ${backgroundGradient} shadow-lg transition`}
      >
        <div>
          {type === "success" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 flex-shrink-0 stroke-current text-black"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              viewBox="0 96 960 960"
              width="20"
            >
              <path d="M480 756q15 0 25.5-10.5T516 720q0-15-10.5-25.5T480 684q-15 0-25.5 10.5T444 720q0 15 10.5 25.5T480 756Zm-36-132h72V384h-72v240ZM341 912 144 714V437l197-197h278l197 197v278L618 912H341Zm30-72h218l155-155V467L588 312H371L216 467v218l155 155Zm109-264Z" />
            </svg>
          )}
          <span className="text-black">{title}</span>
        </div>
      </div>
    </Transition>
  );
}
