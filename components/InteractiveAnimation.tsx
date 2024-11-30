'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function InteractiveAnimation() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    const handleMouseMove = (event: React.MouseEvent) => {
        const { clientX, clientY } = event
        const { left, top, width, height } = event.currentTarget.getBoundingClientRect()
        const x = (clientX - left) / width
        const y = (clientY - top) / height
        setMousePosition({ x, y })
    }

    return (
        <div
            className="w-full h-full flex items-center justify-center"
            onMouseMove={handleMouseMove}
        >
            <motion.div
                className="w-40 h-40 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                animate={{
                    x: mousePosition.x * 100 - 50,
                    y: mousePosition.y * 100 - 50,
                    scale: 1 + mousePosition.x * 0.2,
                    rotate: (mousePosition.x - 0.5) * 90,
                }}
                transition={{ type: 'spring', damping: 10, stiffness: 100 }}
            />
        </div>
    )
}

