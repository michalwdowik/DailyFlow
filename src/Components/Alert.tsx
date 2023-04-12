/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { Transition } from '@headlessui/react'
import { createPortal } from 'react-dom'

export type AlertType = {
    isShowed?: boolean
    type?: string
    title?: string
    background?: string
}

type AlertProps = {
    alert?: AlertType
}

export default function Alert({
    alert = { isShowed: false, type: '', title: '', background: '' },
}: AlertProps): JSX.Element {
    const portal = document.getElementById('portal')

    return (
        <div>
            {createPortal(
                <div>
                    {alert.isShowed && (
                        <Transition
                            show
                            enter="transition-opacity duration-150 "
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div
                                className={`alert absolute inset-x-0 top-0 w-4/6 ${alert.background} transition`}
                            >
                                {alert.type && alert.title && (
                                    <div>
                                        <AlertIcon type={alert.type} />
                                        <AlertMessage message={alert.title} />
                                    </div>
                                )}
                            </div>
                        </Transition>
                    )}
                </div>,
                portal!
            )}
        </div>
    )
}

type AlertIconProps = {
    type: string
}

function AlertIcon({ type }: AlertIconProps): JSX.Element {
    return type === 'success' ? <SuccessIcon /> : <ErrorIcon />
}

type AlertMessageProps = {
    message: string
}

function AlertMessage({ message }: AlertMessageProps): JSX.Element {
    return <span className="text-black">{message}</span>
}

function SuccessIcon(): JSX.Element {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="flex-shrink-0 w-6 h-6 text-black stroke-current"
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
    )
}

function ErrorIcon(): JSX.Element {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            viewBox="0 96 960 960"
            width="20"
        >
            <path d="M480 756q15 0 25.5-10.5T516 720q0-15-10.5-25.5T480 684q-15 0-25.5 10.5T444 720q0 15 10.5 25.5T480 756Zm-36-132h72V384h-72v240ZM341 912 144 714V437l197-197h278l197 197v278L618 912H341Zm30-72h218l155-155V467L588 312H371L216 467v218l155 155Zm109-264Z" />
        </svg>
    )
}