const MOVIES_API_BEARER_TOKEN = import.meta.env.VITE_MOVIES_API_BEARER_TOKEN

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: MOVIES_API_BEARER_TOKEN,
    },
}

export const getMovieDetailsById = (movieID) =>
    fetch(
        `https://api.themoviedb.org/3/movie/${movieID}?language=en-US`,
        options
    ).then((res) => {
        if (!res.ok) {
            throw new Error(res.status)
        }
        return res.json()
    })

export const getPopularMovies = () =>
    getMoviesListWithURL(
        'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1'
    )

export const getTopRatedMovies = () =>
    getMoviesListWithURL(
        'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1'
    )

const getMoviesListWithURL = (URL) =>
    fetch(URL, options)
        .then((res) => {
            if (!res.ok) {
                throw new Error(res.status)
            }
            return res.json()
        })
        .then((res) => {
            return res.results
        })
