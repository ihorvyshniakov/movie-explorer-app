import { Container, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'

import './App.css'

import Header from './components/Header'

// TODO 👇
// * Pages
// - Home page (popular/trend movies)
// - Movie page (description, actors, trailer)

// * Features
// - Filter by category (comedy/horrors/action)
// - Searching with caching (via useReducer)
// - Routing inside app (react-router)
// ? 'to top' button (https://mui.com/material-ui/react-app-bar/#scrolling)

// * Requirements
// + Using UI lib (https://mui.com/material-ui/)
// - Usage of all hooks (useState, useEffect, useRef, useReducer, useContext)
// - Using API (https://developer.themoviedb.org/reference/intro/getting-started)

function App() {
    return (
        <>
            <Header />
            <main>
                <Container maxWidth="md">
                    <Grid container spacing={2} sx={{ margin: '1rem 0' }}>
                        <Grid size={12}>
                            <Typography
                                variant="h3"
                                component="h3"
                                align="center"
                            >
                                Search your favorite movie!
                            </Typography>
                            <TextField
                                fullWidth
                                label="Search..."
                                id="search"
                                margin="normal"
                            />
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </>
    )
}

export default App
