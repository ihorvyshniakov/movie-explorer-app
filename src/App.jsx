import Button from '@mui/material/Button'

import './App.css'

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
            <h1>Movie Explorer</h1>
            <Button variant="contained">Hello world</Button>
        </>
    )
}

export default App
