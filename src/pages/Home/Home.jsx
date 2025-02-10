import MoviesGrid from './MoviesGrid/MoviesGrid'
import SearchBlock from './SearchBlock/SearchBlock'
import MovieModal from '../Movie/MovieModal/MovieModal'

const Home = () => {
    return (
        <>
            <MovieModal />
            <SearchBlock />
            <MoviesGrid />
        </>
    )
}

export default Home
