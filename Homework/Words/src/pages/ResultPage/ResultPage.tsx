import React from 'react'
import { useLocation } from 'react-router-dom'
import {TestResult} from '../../shared/TestResult/TestResult.tsx'

export const ResultPage: React.FC = () => {
    const location = useLocation()
    console.log(location)
    const { correct = 0, total = 0 } = location.state || {}

    return (
        <TestResult correct={correct} total={total} />
    )
}