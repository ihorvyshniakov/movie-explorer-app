export function reducer(state, action) {
    switch (action.type) {
        case 'set_error':
            return {
                ...state,
                error: action.payload,
            }

        case 'set_show': {
            const { movies, page } = action.payload
            return {
                ...state,
                show: {
                    movies: movies ? movies : state.show.movies,
                    page: page ? page : state.show.page,
                },
            }
        }

        case 'set_total_pages':
            return {
                ...state,
                totalPages: action.payload,
            }

        case 'set_movies':
            return {
                ...state,
                movies: {
                    ...state.movies,
                    [action.payload.name]: action.payload.value,
                },
            }

        case 'set_is_movies_loading':
            return {
                ...state,
                movies: {
                    ...state.movies,
                    isLoading: action.payload,
                },
            }

        default:
            return state
    }
}
