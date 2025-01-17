import { useEffect, useState } from 'react'
import {
    Alert,
    CircularProgress,
    Container,
    TextField,
    Typography,
} from '@mui/material'
import Grid from '@mui/material/Grid2'

import './App.css'

import Header from './components/Header'
import MovieCard from './components/MovieCard'
import { getTopRatedMovies } from './store/https'
import { useStoreContext } from './store/store'

// TODO 👇
// * Pages
// - Home page (popular/trend movies)
// - Movie page (description, actors, trailer)

// * Features
// - Filter by category (comedy/horrors/action)
// - Searching with caching (via useReducer)
// - Routing inside app (react-router)
// ? 'to top' button (https://mui.com/material-ui/react-app-bar/#scrolling)

// * Requirements
// + Using UI lib (https://mui.com/material-ui/)
// - Usage of all hooks (useState, useEffect, useRef, useReducer, useContext)
// - Using API (https://developer.themoviedb.org/reference/intro/getting-started)

// TODO
// error handling
// preloader for cards

function App() {
    const { topRatedMoviesList, setTopRatedMoviesList } = useStoreContext()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)

        getTopRatedMovies()
            .then((moviesList) => {
                setTopRatedMoviesList(moviesList)
                setError(null)
            })
            .catch((error) => {
                setError(error.message)
            })

        setLoading(false)
    }, [])

    return (
        <>
            <Header />
            <main>
                <Container maxWidth="md">
                    <Grid container spacing={2} sx={{ margin: '1rem 0' }}>
                        <Grid size={12}>
                            <Typography
                                variant="h3"
                                component="h3"
                                align="center"
                            >
                                Search your favorite movie!
                            </Typography>
                            <TextField
                                fullWidth
                                label="Search..."
                                id="search"
                                margin="normal"
                            />
                        </Grid>
                    </Grid>
                    {error && (
                        <Alert severity="error" sx={{ marginBottom: '1rem' }}>
                            {error}
                        </Alert>
                    )}
                    <Grid
                        container
                        spacing={2}
                        columns={{ xs: 4, sm: 8, md: 12 }}
                        sx={{ marginBottom: '4rem' }}
                    >
                        {loading && (
                            <Grid
                                size={12}
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                sx={{ height: '300px' }}
                            >
                                <CircularProgress size="5rem" />
                            </Grid>
                        )}
                        {topRatedMoviesList.length > 0 &&
                            !error &&
                            topRatedMoviesList.map(
                                ({
                                    id,
                                    title,
                                    overview,
                                    poster_path,
                                    vote_average,
                                    release_date,
                                }) => (
                                    <Grid
                                        size={4}
                                        display="flex"
                                        justifyContent="center"
                                        key={id}
                                    >
                                        <MovieCard
                                            title={title}
                                            overview={overview}
                                            poster_path={`https://image.tmdb.org/t/p/w300/${poster_path}`}
                                            vote_average={vote_average}
                                            release_date={release_date}
                                        />
                                    </Grid>
                                )
                            )}
                    </Grid>
                </Container>
            </main>
        </>
    )
}

export default App
