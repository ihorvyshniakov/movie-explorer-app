import { Route, Routes } from 'react-router'
import { Box, Container, useColorScheme } from '@mui/material'

import './App.css'
import { Home, Movie } from './pages'
import { Footer, Header, ScrollTopButton } from './components'

//* DONE
// - Tooltips: added to Header icons
// - Chips: little code optimization fix
// - Refactoring: added hook - useFetchMovies

// TODO 👇
// - Skeletons: organization
// - Refactoring
// ? Animations
// - modal opening
// - cross clicking
// - page appearing

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
