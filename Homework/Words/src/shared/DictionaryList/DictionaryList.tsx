import React from 'react'
import styles from './DictionaryList.module.scss'
import { List, ListItem, IconButton, Box, Typography, Divider, Grid } from '@mui/material'
import { Edit, Delete } from '@mui/icons-material'

const DictionaryList: React.FC = ({ words, onEdit, onDelete }) => {
    return (
        <div className={styles.container}>
            <Grid container className={styles.header} px={2} py={1}>
                <Grid item xs={5} className={styles.column}>
                    <Typography variant='subtitle1' fontWeight='bold'>
                        Russian word
                    </Typography>
                </Grid>
                <Grid item xs={5} className={styles.column}>
                    <Typography variant='subtitle1' fontWeight='bold'>
                        Translate
                    </Typography>
                </Grid>
                <Grid item xs={2}></Grid>
            </Grid>
            <Divider />

            <List className={styles.wordList}>
                {words.map((word) => (
                    <ListItem
                        key={word.id}
                        className={styles.listItem}
                        secondaryAction={
                            <Box className={styles.actions}>
                                <IconButton onClick={() => onEdit(word)}>
                                    <Edit />
                                </IconButton>
                                <IconButton onClick={() => onDelete(word.id)}>
                                    <Delete />
                                </IconButton>
                            </Box>
                        }
                    >
                        <Grid container alignItems='center'>
                            <Grid item xs={5} className={styles.column}>
                                <Typography className={styles.wordText}>
                                    {word.original}
                                </Typography>
                            </Grid>
                            <Grid item xs={5} className={styles.column}>
                                <Typography className={styles.wordText}>
                                    {word.translation}
                                </Typography>
                            </Grid>
                        </Grid>
                    </ListItem>
                ))}
            </List>
        </div>
    )
}

export { DictionaryList }