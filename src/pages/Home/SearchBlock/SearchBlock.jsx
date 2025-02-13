import { useRef } from 'react'
import {
    Button,
    LinearProgress,
    Stack,
    TextField,
    Typography,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useSearchParams } from 'react-router'

import { useStoreContext } from '../../../context/StoreContext'

const SearchBlock = () => {
    const {
        searchInput,
        isMoviesLoading,

        setSearchInput,
    } = useStoreContext()
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
                <Typography
                    component="h3"
                    align="center"
                    color="textPrimary"
                    sx={{
                        typography: {
                            xs: 'h5',
                            md: 'h4',
                        },
                    }}
                >
                    Find your favorite movie 🔍
                </Typography>
            </Grid>
            <Grid size={12}>
                <form onSubmit={handleSubmit}>
                    <Stack direction="row" spacing={2}>
                        <TextField
                            fullWidth
                            label="Search..."
                            color="primary"
                            ref={inputRef}
                            value={searchInput}
                            onChange={handleInputChange}
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
