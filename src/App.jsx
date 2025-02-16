import { Route, Routes } from 'react-router'
import { Box, Container, useColorScheme } from '@mui/material'

import './App.css'

import Header from './components/Header/Header'
import Movie from './pages/Movie/Movie'
import Home from './pages/Home/Home'
import ScrollTopButton from './components/ScrollTopButton/ScrollTopButton'
import Footer from './components/Footer/Footer'

//* DONE
// - Context optimization: switched 'searchInput' to useState()
// - Context optimization: replaced 'error' to 'movies', because it's related to this
// - Context optimization: removed 'empty' movies, not using
// - Movie: removed extra request
// - Movie: fixed image preloader height
// - Cache: don't fetch again same category, if result saved
// - [BUG] while fetching show only skeleton
// - added correct scrolling after pagination + removed jumping height of page
// - Images: added 'no image' icon for missing images
// - Skeletons: added to missing blocks
// - Modal closing: console error fix
// - Animations: installed Framer Motion
// - Animations: added 3d-hover(tilt) effect for movie card

// TODO 👇
// - Movie card(hover): add border styling
// - Skeletons: organization
// - Refactoring
// ? Animations

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
