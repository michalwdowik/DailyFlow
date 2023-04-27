import { useEffect } from 'react'

type Options = {
    closeModal: () => void
}

const useCloseOnOutsideClick = ({ closeModal }: Options, delay = 300) => {
    useEffect(() => {
        let timer: number
        const handleMouseDown = (event: MouseEvent) => {
            const target = event.target as HTMLElement
            if (!target.closest('.modal-box')) {
                timer = setTimeout(() => {
                    closeModal()
                }, delay)
            }
        }
        document.addEventListener('mousedown', handleMouseDown)
        return () => {
            document.removeEventListener('mousedown', handleMouseDown)
            if (timer) {
                clearTimeout(timer)
            }
        }
    }, [closeModal, delay])
}

export default useCloseOnOutsideClick
