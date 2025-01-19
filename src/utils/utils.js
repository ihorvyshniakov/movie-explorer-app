export const scrollToElementIfItWasOpened = (movieId) => {
    const scrollToElementId = localStorage.getItem('scrollToMovieId')

    if (scrollToElementId == movieId) {
        document
            .getElementById(scrollToElementId)
            .scrollIntoView({ behavior: 'smooth', block: 'center' })
        localStorage.removeItem('scrollToMovieId')
    }
}
