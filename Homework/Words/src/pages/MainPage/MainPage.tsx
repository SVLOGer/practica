import React from 'react'
import styles from './MainPage.module.scss'
import { Button, Container, Typography, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const MainPage: React.FC = () => {
    const navigate = useNavigate()

    return (
        <Container sx={{ml: 0}} className={styles.container} maxWidth='sm'>
            <Box className={styles.content}>
                <Typography variant='h4' gutterBottom>
                    Language Learning App
                </Typography>
                <Box className={styles.buttons}>
                    <Button
                        variant='contained'
                        size='large'
                        onClick={() => navigate('/dictionary')}
                    >
                        Dictionary
                    </Button>
                    <Button
                        variant='outlined'
                        size='large'
                        onClick={() => navigate('/test')}
                    >
                        Test Yourself
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export { MainPage }