import { useState } from 'react'
import styles from './AddWordForm.module.scss'
import { Button, TextField, Box } from '@mui/material'

const AddWordForm = ({ initialValues, onSubmit }) => {
    const [values, setValues] = useState(initialValues || { original: '', translation: '' })

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (values.original.trim() && values.translation.trim()) {
            onSubmit(values)
        }
    }

    return (
        <Box component='form' className={styles.form} onSubmit={handleSubmit}>
            <TextField
                className={styles.inputField}
                fullWidth
                label='Russian word'
                name='original'
                value={values.original}
                onChange={handleChange}
                margin='normal'
                required
            />
            <TextField
                className={styles.inputField}
                fullWidth
                label='Translation'
                name='translation'
                value={values.translation}
                onChange={handleChange}
                margin='normal'
                required
            />
            <Button
                type='submit'
                variant='contained'
                className={styles.submitButton}
            >
                {initialValues ? 'Update' : 'Add'}
            </Button>
        </Box>
    )
}

export { AddWordForm }