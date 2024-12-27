import { Typography } from '@mui/material'

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

// * Requirements
// + Using UI lib (https://mui.com/material-ui/)
// - Usage of all hooks (useState, useEffect, useRef, useReducer, useContext)
// - Using API (https://developer.themoviedb.org/)

function App() {
    return (
        <>
            <Header />
            <main>
                <Typography variant="h3" component="h3">
                    Home page
                </Typography>
            </main>
        </>
    )
}

export default App
