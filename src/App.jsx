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
// - TopRated page: correct scrolling after pagination

// TODO 👇
// - correct scrolling after pagination
// - cache/show request, if you have result(reduce requests)
// - [BUG] weird jump when open modal, clicked not full visible movie card (add scroll to element by myself)
// useEffect(() => {
//     history.scrollRestoration = 'manual'
// }, [])
// - [BUG] first load of Movie page, behind modal is shit
// - [BUG] put wrong page number, load data
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
