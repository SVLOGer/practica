import React, { useState, useEffect } from 'react'
import styles from './EditWordForm.module.scss'
import { Button, TextField, Box, Dialog, DialogTitle, DialogContent } from '@mui/material'

export const EditWordForm: React.FC = ({ word, open, onClose, onSave }) => {
    const [values, setValues] = useState({ original: '', translation: '' })

    useEffect(() => {
        if (word) {
            setValues({
                original: word.original,
                translation: word.translation
            })
        }
    }, [word])

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (values.original.trim() && values.translation.trim()) {
            onSave(values)
            onClose()
        }
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Word</DialogTitle>
            <DialogContent className={styles.dialogContent}>
                <Box component='form' onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label='Original word'
                        name='original'
                        value={values.original}
                        onChange={handleChange}
                        margin='normal'
                        required
                    />
                    <TextField
                        fullWidth
                        label='Translation'
                        name='translation'
                        value={values.translation}
                        onChange={handleChange}
                        margin='normal'
                        required
                    />
                    <Box className={styles.formActions}>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button type='submit' variant='contained'>Save</Button>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    )
}