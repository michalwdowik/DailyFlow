import { useEffect, useRef, ReactNode } from 'react'
import { createPortal } from 'react-dom'

export default function Portal({ rootId, children }: PortalProps) {
    const target = useRef<HTMLElement | null>(document.getElementById(rootId))

    useEffect(() => {
        return () => {
            window.requestAnimationFrame(() => {
                if (target.current && target.current.childNodes.length === 0) {
                    target.current.remove()
                    target.current = null
                }
            })
        }
    }, [rootId])

    if (!target.current) {
        target.current = document.createElement('div')
        target.current.setAttribute('id', rootId)
        document.body.appendChild(target.current)
    }

    return createPortal(children, target.current)
}
type PortalProps = {
    rootId: string
    children: ReactNode
}
