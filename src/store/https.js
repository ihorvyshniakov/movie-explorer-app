const MOVIES_API_BEARER_TOKEN = import.meta.env.VITE_MOVIES_API_BEARER_TOKEN

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: MOVIES_API_BEARER_TOKEN,
    },
}

export const getMovieDetailsById = (movieID) =>
    fetch(`https://api.themoviedb.org/3/movie/${movieID}`, options).then(
        (res) => {
            if (!res.ok) {
                throw new Error(res.status)
            }
            return res.json()
        }
    )

export const getMoviesBySearch = (searchInput) =>
    getMoviesListWithURL(
        `https://api.themoviedb.org/3/search/movie?query=${searchInput}`
    )

export const getPopularMovies = () =>
    getMoviesListWithURL('https://api.themoviedb.org/3/movie/popular')

export const getTopRatedMovies = () =>
    getMoviesListWithURL('https://api.themoviedb.org/3/movie/top_rated')

const getMoviesListWithURL = async (URL) =>
    fetch(URL, options)
        .then((res) => {
            if (!res.ok) {
                // 400, 500 errors (wrong Endpoint)
                throw new Error(
                    JSON.stringify({
                        status: res.status,
                        url: res.url,
                    })
                )
            }
            return res.json()
        })
        .then((res) => {
            if (res.results) {
                return res.results
            }
            // wrong response data
            throw new Error(JSON.stringify(res))
        })
        .catch((error) => {
            // network error
            throw new Error(
                JSON.stringify({
                    status: error.message,
                })
            )
        })

// Response for test handling errors (wrong data)
// eslint-disable-next-line
const mockInvalidResponse = async () =>
    new Promise((resolve) =>
        resolve({
            json: () => Promise.resolve({ invalidKey: 'Unexpected data' }),
            ok: true,
        })
    )
