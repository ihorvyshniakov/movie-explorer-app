import { Route, Routes } from 'react-router'
import { Container } from '@mui/material'

import './App.css'

import Header from './components/Header/Header'
import Movie from './pages/Movie/Movie'
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
// + Movie page is a modal
// + responsive Layout for Modal with Movie details
// + Modal: added close button

// TODO 👇
// - Modal: if close sent to previous link, not home
// - Pagination instead of category filter
// - clean + refactor

// - Темна/світла тема
// - Анімації
// - Початковий екран з привітанням і переліком того, що я використовую та демонструю у цьому проекті
// - Футер
// - Як оптимізувати додаток? Девтулз кольорами рендери, консоль на зменшення рендерів

function App() {
    return (
        <>
            <Header />
            <main>
                <Container maxWidth="md">
                    <Routes>
                        <Route path="/" element={<Home />}>
                            <Route
                                path="/movie/:movieId/:movieTitle?"
                                element={<Movie />}
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
