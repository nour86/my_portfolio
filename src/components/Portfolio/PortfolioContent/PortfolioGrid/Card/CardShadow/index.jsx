'use client'
import { useMouseContext } from '@/components/utils/MouseContext'
import React, { useEffect, useRef, useState } from 'react'

const CardShadow = () => {
    const { state } = useMouseContext()

    const [cardPosition, setCardPosition] = useState({ left: 0, top: 0 })

    const cardRef = useRef(null)

    useEffect(() => {
        const rect = cardRef.current.getBoundingClientRect()
        const leftRect = rect.left
        const topRect = rect.top
        setCardPosition({ left: leftRect, top: topRect })
    }, [state.mouseInGrid])

    const relativeX = state.mousePosition.x - cardPosition.left
    const relativeY = state.mousePosition.y - cardPosition.top

    return (
        <>
            <div
                name="card-background"
                className="absolute h-full w-full left-0 top-0 opacity-0 m-xs hover:opacity-100 rounded-xl transition-opacity duration-500 z-[3]"
                style={{
                    background: `radial-gradient(800px circle at ${relativeX}px ${relativeY}px, rgba(255, 255, 255, 0.2), transparent 40%)`,
                }}
                ref={cardRef}
            ></div>
            <div
                name="card-border"
                className={`absolute h-full w-full left-0 top-0 ${
                    state.mouseInGrid ? 'opacity-100' : 'opacity-0'
                } rounded-xl transition-opacity duration-500 z-[1] `}
                style={{
                    background: `radial-gradient(
                    800px circle at ${relativeX}px ${relativeY}px,rgba(255, 255, 255, 0.6),transparent 40%)`,
                }}
            ></div>
        </>
    )
}

export default CardShadow
