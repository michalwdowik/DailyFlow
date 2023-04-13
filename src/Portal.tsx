import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'

interface Props {
    children: React.ReactNode
}

function Portal({ children }: Props) {
    const portalContainer = document.createElement('portal')

    useEffect(() => {
        document.body.appendChild(portalContainer)
        return () => {
            document.body.removeChild(portalContainer)
        }
    }, [portalContainer])

    return createPortal(children, portalContainer)
}

export default Portal
