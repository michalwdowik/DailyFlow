import { useEffect } from 'react'

export default function useModalEscape(id: string) {
    useEffect(() => {
        const closeModal = (event: KeyboardEvent) => {
            const escapeClicked = event.code === 'Escape'
            if (escapeClicked) {
                const modal = document.getElementById(
                    id
                ) as HTMLInputElement | null

                if (modal) modal.checked = false
            }
        }
        document.addEventListener('keydown', closeModal)
        return () => {
            document.removeEventListener('keydown', closeModal)
        }
    }, [id])
}
