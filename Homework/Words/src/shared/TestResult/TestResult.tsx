import React from 'react'
import styles from './TestResult.module.scss'
import { Box, Typography, Button, CircularProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom'

interface TestResultProps {
    correct: number
    total: number
}

const TestResult: React.FC<TestResultProps> = ({ correct, total }) => {
    const navigate = useNavigate()
    const percentage = Math.round((correct / total) * 100)

    return (
        <Box className={styles.resultContainer}>
            <Typography variant='h4' gutterBottom>
                Test Results
            </Typography>
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress
                    className={styles.circularProgress}
                    variant='determinate'
                    value={percentage}
                    size={120}
                    thickness={4}
                />
                <Box sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Typography variant='h5'>{percentage}%</Typography>
                </Box>
            </Box>
            <Typography className={styles.resultText} variant='body1'>
                You answered {correct} out of {total} questions correctly
            </Typography>
            <Box className={styles.buttonGroup}>
                <Button variant='contained' onClick={() => navigate('/test')}>
                    Try Again
                </Button>
                <Button variant='outlined' onClick={() => navigate('/')}>
                    Back to Home
                </Button>
            </Box>
        </Box>
    )
}

export { TestResult }