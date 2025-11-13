'use client'
import { useState } from 'react'

interface DualToggleProps {
    left: React.ReactNode
    right: React.ReactNode
    initialActiveId?: 0 | 1
    onToggle?: (activeId: 0 | 1) => void
    className?: string
}

export default function DualToggle({
    left,
    right,
    initialActiveId = 0,
    onToggle,
    className = ''
}: DualToggleProps) {
    const [activeId, setActiveId] = useState<0 | 1>(initialActiveId)

    const handleToggle = (id: 0 | 1) => {
        setActiveId(id)
        onToggle?.(id)
    }

    return (
        <div className={`relative flex w-fit grid-flow-col auto-cols-fr bg-[#494B55] rounded-lg ${className}`}>
            <div
                className={`absolute top-0 bottom-0 bg-[#83B235] rounded-lg transition-all duration-200 ${
                    activeId === 0 ? 'left-0 right-1/2' : 'left-1/2 right-0'
                }`}
            />
            
            <button
                onClick={() => handleToggle(0)}
                className="relative z-10 flex text-white cursor-pointer whitespace-nowrap"
                >
                {left}
            </button>
            
            <button
                onClick={() => handleToggle(1)}
                className="relative z-10 flex text-white cursor-pointer whitespace-nowrap"
            >
                {right}
            </button>
        </div>
    )
}