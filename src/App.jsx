import { Route, Routes } from 'react-router'
import { Box, Container, useColorScheme } from '@mui/material'

import './App.css'
import { Home, Movie } from './pages'
import { Footer, Header, ScrollTopButton } from './components'

//* DONE
// - Tooltips: added to Header icons
// - Chips: little code optimization fix
// - Refactoring: added hook - useFetchMovies
// - Refactoring: added hook - useHoverTilt
// - Refactoring: replaced 'quotes' array to /data/constants
// - Refactoring: added hook - useFetchMovieById + util func generateArrayForTable() + formatDate() to utils
// - Refactoring: changed format logic for 'year' getting
// - Animations: appearing for Header
// - Animations: added clicking for Header 'home' link
// - Animations: animated 'SearchBlock' appear + input click
// - Animations: Footer message appearing
// - Animations: added onClick 'ScrollTopButton'
// - Animations: added sliding on modal opening
// - Responsive: width of 'find' button
// - Search details: text -> Chips UI components

// TODO 👇
// - Deploy
// - Made beautiful pictures for Portfolio description
// - Write the description for this project

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
