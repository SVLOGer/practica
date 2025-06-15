import React, { useState, useEffect } from 'react'
import styles from './TestPage.module.scss'
import { useNavigate } from 'react-router-dom'
import { Button, Card, CardContent, Typography, Box } from '@mui/material'
import { useStore } from '../../store/store.ts'

const TestPage: React.FC = () => {
    const { words, addTestResult } = useStore()
    const [currentIndex, setCurrentIndex] = useState(0)
    const [score, setScore] = useState(0)
    const [options, setOptions] = useState<string[]>([])
    const [showResult, setShowResult] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (words.length > 0 && currentIndex < words.length) {
            const currentWord = words[currentIndex]
            const otherTranslations = words
                .filter((_, i) => i !== currentIndex)
                .map(word => word.translation)
                .sort(() => 0.5 - Math.random())
                .slice(0, 3)

            setOptions([...otherTranslations, currentWord.translation].sort(() => 0.5 - Math.random()))
        }
    }, [currentIndex, words])

    const handleAnswer = (answer: string) => {
        const currentWord = words[currentIndex]
        const isCorrect = answer === currentWord.translation
        const newScore = isCorrect ? score + 1 : score

        if (currentIndex < words.length - 1) {
            setScore(newScore)
            setCurrentIndex(currentIndex + 1)
        } else {
            setScore(newScore)
            addTestResult({ correct: newScore, total: words.length })
            setTimeout(() => setShowResult(true), 0)
        }
    }

    useEffect(() => {
        if (words.length === 0) {
            navigate('/dictionary')
        }
    }, [words, navigate])

    useEffect(() => {
        if (showResult) {
            navigate('/result', { state: { correct: score, total: words.length } })
        }
    }, [showResult, navigate, score, words.length])

    if (words.length === 0 || currentIndex >= words.length) {
        return <div>No words available</div>
    }

    return (
        <Card className={styles.testCard}>
            <CardContent>
                <Typography variant='h5' gutterBottom>
                    What is the translation of:
                </Typography>
                <Typography variant='h4' sx={{ mb: 3 }}>
                    {words[currentIndex].original}
                </Typography>
                <Box className={styles.optionsContainer}>
                    {options.map((option) => (
                        <Button
                            key={option}
                            variant='outlined'
                            onClick={() => handleAnswer(option)}
                        >
                            {option}
                        </Button>
                    ))}
                </Box>
            </CardContent>
        </Card>
    )
}

export { TestPage }