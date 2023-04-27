import { useState } from 'react'
import Portal from './Portal'
import { AlertType, SuccessOrErrorType } from '../types/types'

const ALERT_DURATION = 3000
export const showAlert = (
    alertData: AlertType,
    setAlertState: (alert: AlertType) => void
) => {
    setAlertState(alertData)

    const timer = setTimeout(() => {
        setAlertState({
            ...alertData,
            isShowed: false,
        })
    }, ALERT_DURATION)
    return () => clearTimeout(timer)
}

export const useAlertState = () => {
    const [alertState, setAlertState] = useState<PartialAlertType>({})
    return { alertState, setAlertState }
}

const Alert = ({ alert }: AlertProps): JSX.Element => {
    const isAlertDeclared = alert.type && alert.title
    return (
        <div>
            {alert?.isShowed && (
                <Portal rootId="portal">
                    <div
                        className={`alert absolute inset-x-0 top-0 w-4/6 ${alert.background} portalStyle transition`}
                        style={{ zIndex: 1000 }}
                    >
                        {isAlertDeclared && (
                            <div>
                                <AlertIcon alertType={alert.type ?? 'error'} />
                                <AlertMessage
                                    alertMessage={alert.title ?? 'no message'}
                                />
                            </div>
                        )}
                    </div>
                </Portal>
            )}
        </div>
    )
}

export default Alert

const AlertIcon = ({ alertType }: AlertIconProps): JSX.Element => {
    return alertType === 'success' ? <SuccessIcon /> : <ErrorIcon />
}

const AlertMessage = ({ alertMessage }: AlertMessageProps): JSX.Element => {
    return <span className="text-black">{alertMessage}</span>
}

const SuccessIcon = (): JSX.Element => {
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

const ErrorIcon = (): JSX.Element => {
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

type PartialAlertType = Partial<AlertType>

type AlertProps = {
    alert: PartialAlertType
}

type AlertIconProps = {
    alertType: SuccessOrErrorType
}
type AlertMessageProps = {
    alertMessage: string
}
