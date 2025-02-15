import { Route, Routes } from 'react-router'
import { Box, Container, useColorScheme } from '@mui/material'

import './App.css'

import Header from './components/Header/Header'
import Movie from './pages/Movie/Movie'
import Home from './pages/Home/Home'
import ScrollTopButton from './components/ScrollTopButton/ScrollTopButton'
import Footer from './components/Footer/Footer'

//? Backlog
// - Початковий екран з привітанням і переліком того, що я використовую та демонструю у цьому проекті
// - Як оптимізувати додаток? Девтулз кольорами рендери, консоль на зменшення рендерів

//* DONE
// - Context optimization: switched 'searchInput' to useState()
// - Context optimization: replaced 'error' to 'movies', because it's related to this
// - Context optimization: removed 'empty' movies, not using
// - Movie: removed extra request
// - Cache: don't fetch again same category, if result saved

// TODO 👇
// - [BUG] while fetching 'search' result show previous
// - [BUG] first load of Movie page, behind modal is shit

// - Animation: 3d-hover offect/styling for movie card
// - correct scrolling after pagination
// - Refactoring + skeletons/isLoading

function App() {
    const { mode } = useColorScheme()

    if (!mode) {
        return null
    }

    return (
        <Box
            bgcolor="background.default"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100svh',
            }}
        >
            <Header />

            <main style={{ flexGrow: 1 }}>
                <Container maxWidth="lg">
                    <Routes>
                        <Route path="/" element={<Home />}>
                            <Route path="/movie/:movieId" element={<Movie />} />
                        </Route>
                    </Routes>
                </Container>
            </main>

            <Footer />
            <ScrollTopButton />
        </Box>
    )
}

export default App
