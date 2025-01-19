import { createContext, useContext, useReducer } from 'react'

const StoreContext = createContext(null)

export const useStoreContext = () => {
    const contex = useContext(StoreContext)

    return contex
}

const initialState = {
    searchInput: '',
    searchMoviesList: [],
    topRatedMoviesList: [],
}

function reducer(state, action) {
    switch (action.type) {
        case 'set_search_input':
            return {
                ...state,
                searchInput: action.payload,
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
    }
}

export const StoreContextProvider = ({ children }) => {
    const [{ searchInput, searchMoviesList, topRatedMoviesList }, dispatch] =
        useReducer(reducer, initialState)

    const setSearchInput = (input) => {
        dispatch({ type: 'set_search_input', payload: input })
    }

    const setSearchMoviesList = (input) => {
        dispatch({ type: 'set_movies_based_on_search', payload: input })
    }

    const setTopRatedMoviesList = (moviesList) => {
        dispatch({ type: 'set_top_rated_movies_list', payload: moviesList })
    }

    const contextValue = {
        searchInput,
        setSearchInput,
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
