import { useEffect, useState } from 'react'
import { Container } from '@mui/material'

import './App.css'

import { getTopRatedMovies } from './store/https'
import { useStoreContext } from './store/store'
import Header from './components/Header/Header'
import MovieCardList from './components/MovieCardList/MovieCardList'
import HomeSearchBlock from './components/HomeSearchBlock/HomeSearchBlock'

// TODO 👇
// * Pages
// - Home page (popular/trend movies)
// - Movie page (description, actors, trailer)

// * Features
// - Filter by category (comedy/horrors/action)
// + Searching with caching (via useReducer)
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
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        setIsLoading(true)

        getTopRatedMovies()
            .then((moviesList) => {
                setTopRatedMoviesList(moviesList)
                setError(null)
            })
            .catch((error) => {
                setError(error.message)
            })

        setIsLoading(false)
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <Header />
            <main>
                <Container maxWidth="md">
                    <HomeSearchBlock />

                    <MovieCardList
                        moviesList={topRatedMoviesList}
                        isLoading={isLoading}
                        error={error}
                    />
                </Container>
            </main>
        </>
    )
}

export default App
