import { Route, Routes } from 'react-router'
import { Container } from '@mui/material'

import './App.css'

import Header from './components/Header/Header'

import MoviePage from './pages/MoviePage/MoviePage'
import Home from './pages/Home/Home'

// TODO 👇
// * Pages
// - Home page (popular/trend movies)
// - Movie page (description, actors, trailer)

// * Features
// - Filter by category (comedy/horrors/action)
// + Searching with caching (via useReducer)
// - Routing inside app (react-router)
// - remove all inline styles
// ? 'to top' button (https://mui.com/material-ui/react-app-bar/#scrolling)
// ? Movie page is a modal
// - Movie page: showing movie details from search, if no info per movieId
// - 'abudabi' request wrong top rated values
// - 'king' bad width layout
// - preloaders for Movie page
// - Mobile: different width of cards
// - Reload: same search input
// - Separate components for image, text with Skeleton

// * Requirements
// + Using UI lib (https://mui.com/material-ui/)
// - Usage of all hooks (useState, useEffect, useRef, useReducer, useContext)
// - Using API (https://developer.themoviedb.org/reference/intro/getting-started)

// TODO
// error handling
// preloader for cards

function App() {
    return (
        <>
            <Header />
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
        </>
    )
}

export default App
