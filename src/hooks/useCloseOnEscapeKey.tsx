/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'

const useCloseOnEscapeKey = ({ id, closeModal }: UseCloseOnEscapeKeyProps) => {
    useEffect(() => {
        const closeModalOnEscapeKey = (event: KeyboardEvent) => {
            const escapeClicked = event.key === 'Escape'
            let timer: NodeJS.Timeout

            if (escapeClicked) {
                const modal = document.getElementById(
                    id
                ) as HTMLInputElement | null

                if (modal) modal.checked = false
                timer = setTimeout(() => {
                    closeModal()
                }, 300)
            }
        }
        document.addEventListener('keydown', closeModalOnEscapeKey)
        return () => {
            document.removeEventListener('keydown', closeModalOnEscapeKey)
        }
    }, [])
}

export default useCloseOnEscapeKey

type UseCloseOnEscapeKeyProps = {
    id: string
    closeModal: () => void
}
