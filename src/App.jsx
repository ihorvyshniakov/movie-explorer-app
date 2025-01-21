import { Route, Routes } from 'react-router'
import { Container } from '@mui/material'

import './App.css'

import Header from './components/Header/Header'

import MoviePage from './pages/MoviePage/MoviePage'
import Home from './pages/Home/Home'
import ScrollTopButton from './components/ScrollTopButton/ScrollTopButton'

// * Pages
// + Home page (popular/trend movies)
// + Movie page (description, actors, trailer)

// * Requirements
// + Using UI lib (https://mui.com/material-ui/)
// + Usage of all hooks (useState, useEffect, useRef, useReducer, useContext)
// + Using API (https://developer.themoviedb.org/reference/intro/getting-started)

// TODO 👇
// ? Movie page is a modal
// - Filter by category (comedy/horrors/action)
// - Reload: same search input
// - preloader for cards

//! Bugs
// - 'abudabi' request wrong top rated values

function App() {
    return (
        <>
            <Header id="back-to-top-anchor" />
            <main>
                <Container maxWidth="md">
                    <Routes>
                        <Route index element={<Home />} />
                        <Route path="movie">
                            <Route
                                path=":movieId/:movieTitle?"
                                element={<MoviePage />}
                            />
                        </Route>
                    </Routes>
                </Container>
            </main>
            <ScrollTopButton />
        </>
    )
}

export default App
