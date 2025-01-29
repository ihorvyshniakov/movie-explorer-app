export {
    scrollToElementIfItWasOpened,
    isJSON,
    numberWithCommas,
    formatIntoDollars,
}

function scrollToElementIfItWasOpened(movieId) {
    const scrollToElementId = localStorage.getItem('scrollToMovieId')

    if (scrollToElementId == movieId) {
        document
            .getElementById(scrollToElementId)
            .scrollIntoView({ behavior: 'smooth', block: 'center' })
        localStorage.removeItem('scrollToMovieId')
    }
}

function isJSON(string) {
    try {
        JSON.parse(string)
    } catch {
        return false
    }
    return true
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const formatIntoDollars = (amount) => {
    return '$ ' + numberWithCommas(amount)
}
