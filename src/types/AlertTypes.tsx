export type AlertType = {
    title: string
    type: 'success' | 'error'
    background: 'bg-error' | 'bg-success'
    isShowed: boolean
}

export type PartialAlertType = Partial<AlertType>

export type AlertProps = {
    alert: PartialAlertType
}

export type AlertIconProps = {
    type: 'success' | 'error'
}
export type AlertMessageProps = {
    message: string
}

export type AlertVariantType = Record<string, AlertType>
