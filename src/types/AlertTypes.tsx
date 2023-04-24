export type AlertType = {
    title?: string
    type?: 'success' | 'error' | 'loading'
    background?: string
    isShowed?: boolean
}

export type AlertProps = {
    alert: AlertType
}

export type AlertIconProps = {
    type: 'success' | 'error' | 'loading'
}
export type AlertMessageProps = {
    message: string
}
