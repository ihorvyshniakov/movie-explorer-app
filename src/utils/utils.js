export const scrollToElementIfItWasOpened = (movieId) => {
    const scrollToElementId = localStorage.getItem('scrollToMovieId')

    if (scrollToElementId == movieId) {
        document
            .getElementById(scrollToElementId)
            .scrollIntoView({ behavior: 'smooth', block: 'center' })
        localStorage.removeItem('scrollToMovieId')
    }
}

export const isJSON = (string) => {
    try {
        JSON.parse(string)
    } catch {
        return false
    }
    return true
}
