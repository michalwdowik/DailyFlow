export const colorStyleBgHandler = (state: ColorStyleState) => {
    switch (state) {
        case 'info':
            return `bg-info`
        case 'error':
            return `bg-error`
        case 'success':
            return `bg-success`
        case 'primary':
            return `bg-primary`
        case 'warning':
            return `bg-warning`
        default:
            return `bg-black`
    }
}

export const colorStyleTextHandler = (state: ColorStyleState) => {
    switch (state) {
        case 'info':
            return `text-info`
        case 'error':
            return `text-error`
        case 'success':
            return `text-success`
        case 'primary':
            return `text-primary`
        case 'warning':
            return `text-warning`
        default:
            return `text-black`
    }
}

export const colorStyleRadioHandler = (state: ColorStyleState) => {
    switch (state) {
        case 'info':
            return `radio-info`
        case 'error':
            return `radio-error`
        case 'success':
            return `radio-success`
        case 'primary':
            return `radio-primary`
        case 'warning':
            return `radio-warning`
        default:
            return `radio-black`
    }
}

export const colorStyleCheckboxHandler = (state: ColorStyleState) => {
    switch (state) {
        case 'info':
            return `radio-info`
        case 'error':
            return `radio-error`
        case 'success':
            return `radio-success`
        case 'primary':
            return `radio-primary`
        case 'warning':
            return `radio-warning`
        default:
            return `radio-black`
    }
}

export const colorStyleTogglerHandler = (state: ColorStyleState) => {
    switch (state) {
        case 'info':
            return `peer-checked:bg-info`
        case 'error':
            return `peer-checked:bg-error`
        case 'success':
            return `peer-checked:bg-success`
        case 'primary':
            return `peer-checked:bg-primary`
        case 'warning':
            return `peer-checked:bg-warning`
        default:
            return ``
    }
}

export const colorPickerColorHandler = (color: { hex: string }) => {
    switch (color.hex) {
        case '#38bdf8':
            return `info`
        case '#f87171':
            return `error`
        case '#10b981':
            return `success`
        case '#7e22ce':
            return `primary`
        case '#eab308':
            return `warning`
        default:
            return `info`
    }
}

export const colorStyleBlobHandler = (state: ColorStyleState) => {
    switch (state) {
        case 'info':
            return `#38bdf8`
        case 'error':
            return `#f87171`
        case 'success':
            return `#10b981`
        case 'primary':
            return `#7e22ce`
        case 'warning':
            return `#eab308`
        default:
            return `#38bdf8`
    }
}

export const colorStyleTooltipHandler = (state: ColorStyleState) => {
    switch (state) {
        case 'info':
            return `tooltip-info`
        case 'error':
            return `tooltip-error`
        case 'success':
            return `tooltip-success`
        case 'primary':
            return `tooltip-primary`
        case 'warning':
            return `tooltip-warning`
        default:
            return `tooltip-black`
    }
}

export type ColorStyleState =
    | 'info'
    | 'error'
    | 'success'
    | 'primary'
    | 'warning'
    | 'default'
