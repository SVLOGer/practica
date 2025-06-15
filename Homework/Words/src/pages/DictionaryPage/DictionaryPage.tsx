import React, { useState } from 'react'
import styles from './DictionaryPage.module.scss'
import { useNavigate } from 'react-router-dom'
import {
    Box,
    Button,
    Typography,
    Dialog, DialogTitle, DialogContent
} from '@mui/material'
import { Add } from '@mui/icons-material'
import {useStore} from '../../store/store.ts'
import {DictionaryList} from '../../shared/DictionaryList/DictionaryList.tsx'
import {AddWordForm} from '../../shared/AddFormCard/AddWordForm.tsx'
import {EditWordForm} from '../../shared/EditWordForm/EditWordForm.tsx'

export const DictionaryPage: React.FC = () => {
    const { words, addWord, editWord, deleteWord } = useStore()
    const [addModalOpen, setAddModalOpen] = useState(false)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [currentWord, setCurrentWord] = useState(null)
    const navigate = useNavigate()

    const handleAdd = (newWord) => {
        addWord({ ...newWord, id: Date.now().toString() })
        setAddModalOpen(false)
    }

    const handleEdit = (word) => {
        setCurrentWord(word)
        setEditModalOpen(true)
    }

    const handleSaveEdit = (updatedWord) => {
        editWord(currentWord.id, updatedWord)
        setEditModalOpen(false)
    }

    return (
        <Box className={styles.pageContainer}>
            <Box className={styles.header}>
                <Typography variant='h4'>Dictionary</Typography>
                <Button
                    variant='contained'
                    startIcon={<Add />}
                    onClick={() => setAddModalOpen(true)}
                >
                    Add Word
                </Button>
            </Box>

            <DictionaryList
                words={words}
                onEdit={handleEdit}
                onDelete={deleteWord}
            />

            <Dialog open={addModalOpen} onClose={() => setAddModalOpen(false)}>
                <DialogTitle>Add New Word</DialogTitle>
                <DialogContent>
                    <AddWordForm
                        onSubmit={handleAdd}
                        onCancel={() => setAddModalOpen(false)}
                    />
                </DialogContent>
            </Dialog>

            <EditWordForm
                word={currentWord}
                open={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                onSave={handleSaveEdit}
            />

            <Box className={styles.backButton}>
                <Button variant='outlined' onClick={() => navigate('/')}>
                    Back to Home
                </Button>
            </Box>
        </Box>
    )
}