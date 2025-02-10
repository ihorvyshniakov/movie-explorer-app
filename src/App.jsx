import { Route, Routes } from 'react-router'
import { Container } from '@mui/material'

import './App.css'

import Header from './components/Header/Header'
import Movie from './pages/Movie/Movie'
import Home from './pages/Home/Home'
import ScrollTopButton from './components/ScrollTopButton/ScrollTopButton'

//? Backlog
// - Початковий екран з привітанням і переліком того, що я використовую та демонструю у цьому проекті
// - Як оптимізувати додаток? Девтулз кольорами рендери, консоль на зменшення рендерів

//* DONE
// Коли оновлювати ShowingMovies???
// - text above movies grid - title for results
// - Movie: added better date formatting

// TODO 👇
// - [BUG] return from error search result to home not showing top rated
// - [BUG] same error status is BAD idea
// - [BUG] return from modal to category jump of content
// - Skeleton preloaders for all loading content (Movie page)
// - Футер
// - Темна/світла тема
// - Pagination instead of category filter
// - Анімації

function App() {
    return (
        <>
            <Header />
            <main>
                <Container maxWidth="md">
                    <Routes>
                        <Route path="/" element={<Home />}>
                            <Route path="/movie/:movieId" element={<Movie />} />
                        </Route>
                    </Routes>
                </Container>
            </main>
            <ScrollTopButton />
        </>
    )
}

export default App
