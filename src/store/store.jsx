import { createContext, useContext, useReducer } from 'react'

const StoreContext = createContext(null)

export const useStoreContext = () => {
    const contex = useContext(StoreContext)

    return contex
}

const initialState = {
    topRatedMoviesList: [],
}

function reducer(state, action) {
    switch (action.type) {
        case 'set_top_rated_movies_list':
            return {
                ...state,
                topRatedMoviesList: action.payload,
            }
    }
}

export const StoreContextProvider = ({ children }) => {
    const [{ topRatedMoviesList }, dispatch] = useReducer(reducer, initialState)

    const setTopRatedMoviesList = (moviesList) => {
        dispatch({ type: 'set_top_rated_movies_list', payload: moviesList })
    }

    const contextValue = {
        topRatedMoviesList,
        setTopRatedMoviesList,
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    )
}
