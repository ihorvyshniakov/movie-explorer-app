import { Route, Routes } from 'react-router'
import { Box, Container, useColorScheme } from '@mui/material'

import './App.css'
import { Home, Movie } from './pages'
import { Footer, Header, ScrollTopButton } from './components'

// TODO 👇
// - [Bug] Mobile: 'splash' scroll middle, return home not scroll to top

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
