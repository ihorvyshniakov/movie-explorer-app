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

//* DONE
// - Стікі хедер
// Routing bugs:
// - [BUG] 'abudabi' request wrong top rated values
// - [BUG] Reload should show movies based on search params http://localhost:5173/?search=nipple
// - [BUG] Removed extra request topRatedMovies while onLoad with search params
// - [BUG] Change search URL only when start fetching
// - [BUG] Return from home to search params page -> show top rated
// - Додати .finally() to fetch

// TODO 👇
// ? Movie page is a modal
// - Filter by category (comedy/horrors/action)
// - clean + refactor

// - Темна/світла тема
// - Своя кольорова тема для додатку
// - Анімації
// - Початковий екран з привітанням і переліком того, що я використовую та демонструю у цьому проекті
// - Футер
// - Apply useMemo, useCallback when needed
// - Як оптимізувати додаток? Девтулз кольорами рендери, консоль на зменшення рендерів

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
