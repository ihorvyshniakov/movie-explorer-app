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

// TODO 👇
// ? Movie page is a modal
// - Filter by category (comedy/horrors/action)
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
