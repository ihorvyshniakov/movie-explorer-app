export function reducer(state, action) {
    switch (action.type) {
        case 'set_error':
            return {
                ...state,
                error: action.payload,
            }

        case 'set_search_input':
            return {
                ...state,
                searchInput: action.payload,
            }

        case 'set_showing_movies':
            return {
                ...state,
                showingMovies: action.payload,
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
