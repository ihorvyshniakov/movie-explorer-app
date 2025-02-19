import { useRef, useState } from 'react'
import {
    Button,
    LinearProgress,
    Stack,
    TextField,
    Typography,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useSearchParams } from 'react-router'
import { motion } from 'motion/react'

import { useStoreContext } from '../../../context/StoreContext'

const MotionTypography = motion.create(Typography)
const MotionTextField = motion.create(TextField)

const SearchBlock = () => {
    const [searchInput, setSearchInput] = useState('')
    const { isMoviesLoading } = useStoreContext()

    const [, setSearchParams] = useSearchParams()
    const inputRef = useRef(null)

    const handleInputChange = (e) => {
        const input = e.target.value

        setSearchInput(input)
        if (input === '') {
            setSearchParams()
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (searchInput.trim()) {
            setSearchParams({ search: searchInput.trim() })
        }
        setSearchInput('')
        const inputEl = inputRef.current.querySelector('input')
        inputEl.blur()
    }

    return (
        <Grid container spacing={2} sx={{ margin: '2rem 0 1rem' }}>
            <Grid size={12}>
                <MotionTypography
                    component="h3"
                    align="center"
                    color="textPrimary"
                    sx={{
                        typography: {
                            xs: 'h5',
                            md: 'h4',
                        },
                    }}
                    viewport={{ once: true }}
                    initial={{ scale: 1 }}
                    whileInView={{ scale: [1, 1.1, 1] }}
                    transition={{ delay: 1.9 }}
                >
                    Find your favorite movie 🔍
                </MotionTypography>
            </Grid>
            <Grid size={12}>
                <form onSubmit={handleSubmit}>
                    <Stack direction="row" spacing={2}>
                        <MotionTextField
                            fullWidth
                            label="Search..."
                            color="primary"
                            ref={inputRef}
                            value={searchInput}
                            onChange={handleInputChange}
                            viewport={{ once: true }}
                            initial={{ scale: 1, y: 0 }}
                            whileTap={{ scale: 0.95 }}
                            whileInView={{ y: [0, -8, 6, -4, 2, 0] }}
                            transition={{ y: { delay: 3 } }}
                        />
                        <Button
                            variant="contained"
                            type="submit"
                            color="secondary"
                        >
                            FIND
                        </Button>
                    </Stack>
                </form>
            </Grid>
            <Grid size={12}>
                <LinearProgress
                    color="secondary"
                    sx={{
                        opacity: isMoviesLoading ? '1' : '0',
                        transition: 'opacity .5s linear',
                    }}
                />
            </Grid>
        </Grid>
    )
}

export default SearchBlock
