'use client'

import React, { useState, useEffect, useRef } from 'react'

import { useScroll, useSpring } from 'framer-motion'

import PortfolioTitle from './PortfolioTitle'
import PortfolioGrid from './ProfolioGrid'
import { MousePositionProvider } from './MouseContext'

const PortfolioB = () => {
    const [jsonData, setJsonData] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('./data.json')
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                const data = await response.json()
                setJsonData(data)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
        fetchData()
    }, [])
    const ref = useRef()

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['end end', 'start start'],
    })
    const scaleX = useSpring(scrollYProgress, { stiffness: 500, damping: 30 })

    return (
        <MousePositionProvider>
            <section
                className="snap-start flex flex-col items-center min-h-screen "
                id="Portfolio"
            >
                <PortfolioTitle />
                <PortfolioGrid />
            </section>
        </MousePositionProvider>
    )
}

export default PortfolioB
