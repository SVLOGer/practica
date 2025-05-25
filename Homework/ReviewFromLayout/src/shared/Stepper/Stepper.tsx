import React, {useEffect, useState} from 'react'
import './Stepper.css'
import {defaultRatings} from "../../utils/DefaultValues/DefaultRatings.ts";

interface StepperProps {
    totalSteps: number,
    setStep: (index: number) => void
    resetTrigger: boolean
    onResetComplete: () => void
}

const Stepper: React.FC<StepperProps> = ({ totalSteps, setStep, resetTrigger, onResetComplete }) => {
    const [activeStep, setActiveStep] = useState<number>(-1)
    const [hoverStep, setHoverStep] = useState<number | null>(null)

    useEffect(() => {
        if (resetTrigger) {
            setActiveStep(-1)
            onResetComplete()
        }
    }, [onResetComplete, resetTrigger])
    
    const handleClick = (index: number) => {
        setActiveStep(index)
        setStep(index)
    }

    const handleMouseEnter = (index: number) => {
        setHoverStep(index)
    }

    const handleMouseLeave = () => {
        setHoverStep(null)
    }

    const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const index = Number(event.target.value)
        setActiveStep(index - 1)
        setStep(index)
    }

    return (
        <div className="stepper">
            <input
                type="range"
                min={0}
                max={totalSteps - 1}
                value={activeStep >= 0 ? activeStep : 0}
                onChange={handleRangeChange}
                style={{
                    position: 'absolute',
                    width: 0,
                    height: 0,
                    opacity: 0,
                    pointerEvents: 'none'
                }}
                aria-hidden="true"
                tabIndex={-1}
            />

            {Array.from({ length: totalSteps }).map((_, index) => {
                const isActive = hoverStep !== null
                    ? index <= hoverStep
                    : index <= activeStep

                const color = hoverStep !== null
                    ? hoverStep === 4
                        ? "green"
                        : hoverStep >= 2
                            ? "orange"
                            : "red"
                    : activeStep === 4
                        ? "green"
                        : activeStep >= 2
                            ? "orange"
                            : "red"

                return (
                    <div className="stepper-item" key={index}>
                        <div
                            className={`step ${isActive ? 'active ' + color : 'none'}`}
                            onClick={() => handleClick(index)}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                        />
                        {index < totalSteps - 1 && <div className="line"/>}
                    </div>
                )
            })}
        </div>
    )
}

export { Stepper }
