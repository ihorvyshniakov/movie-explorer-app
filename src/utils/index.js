export {
    isJSON,
    numberWithCommas,
    formatIntoDollars,
    randomIntFromInterval,
    scrollToTop,
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

function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function scrollToTop() {
    const anchor = document.getElementById('back-to-top-anchor')
    anchor.scrollIntoView({
        behavior: 'smooth',
    })
}
