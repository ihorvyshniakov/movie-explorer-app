import { createContext, useCallback, useContext, useReducer } from 'react'

const StoreContext = createContext(null)

export const useStoreContext = () => {
    const contex = useContext(StoreContext)

    return contex
}

const initialState = {
    error: null,
    searchInput: '',
    showingMovies: [],
    searchMoviesList: [],
    topRatedMoviesList: [],
}

function reducer(state, action) {
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

        case 'set_top_rated_movies_list':
            return {
                ...state,
                topRatedMoviesList: action.payload,
            }

        case 'set_movies_based_on_search':
            return {
                ...state,
                searchMoviesList: action.payload,
            }
        default:
            return state
    }
}

export const StoreContextProvider = ({ children }) => {
    const [
        {
            error,
            searchInput,
            showingMovies,
            searchMoviesList,
            topRatedMoviesList,
        },
        dispatch,
    ] = useReducer(reducer, initialState)

    const setError = useCallback((error) => {
        dispatch({ type: 'set_error', payload: error })
    }, [])

    const setSearchInput = useCallback((input) => {
        dispatch({ type: 'set_search_input', payload: input })
    }, [])

    const setShowingMovies = useCallback((value) => {
        dispatch({ type: 'set_showing_movies', payload: value })
    }, [])

    const setSearchMoviesList = useCallback((input) => {
        dispatch({ type: 'set_movies_based_on_search', payload: input })
    }, [])

    const setTopRatedMoviesList = useCallback((moviesList) => {
        dispatch({ type: 'set_top_rated_movies_list', payload: moviesList })
    }, [])

    const contextValue = {
        error,
        setError,
        searchInput,
        setSearchInput,
        showingMovies,
        setShowingMovies,
        searchMoviesList,
        setSearchMoviesList,
        topRatedMoviesList,
        setTopRatedMoviesList,
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    )
}
