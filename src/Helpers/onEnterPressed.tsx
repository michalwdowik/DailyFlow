import { KeyboardEvent } from 'react'

const onEnterPressed = (
    action: (e: KeyboardEvent<HTMLInputElement>) => void
) => {
    return (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            action(e)
        }
    }
}

export default onEnterPressed
