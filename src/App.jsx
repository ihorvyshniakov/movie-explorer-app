import { Route, Routes } from 'react-router'
import { Box, Container, useColorScheme } from '@mui/material'

import './App.css'

import { Home, Movie } from './pages'
import { Footer, Header, ScrollTopButton } from './components'

//* DONE
// - Movie card(hover): add border styling
// - Skeletons: added Title
// - Skeletons: added Details
// - Skeletons: added ReleaseDate
// - Refactoring: fixed imports for 'WithSkeleton' components
// - Refactoring: fixed imports for all components

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
