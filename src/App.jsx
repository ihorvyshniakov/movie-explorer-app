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

// * Requirements
// + Using UI lib (https://mui.com/material-ui/)
// - Usage of all hooks (useState, useEffect, useRef, useReducer, useContext)
// - Using API (https://developer.themoviedb.org/reference/intro/getting-started)

// TODO
// error handling
// preloader for cards

function App() {
    // "Spirited Away".toLowerCase().replaceAll(' ', '-')
    return (
        <>
            <Header />
            <main>
                <Container maxWidth="md">
                    <Routes>
                        <Route index element={<Home />} />
                        <Route
                            path="/movie/129/spirited-away"
                            element={<MoviePage />}
                        />

                        {/* <Route path="movie">
                            <Route path=":movie-title" element={<City />} />
                        </Route> */}
                    </Routes>
                </Container>
            </main>
        </>
    )
}

export default App
