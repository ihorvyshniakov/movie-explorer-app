export { isJSON, numberWithCommas, formatIntoDollars }

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
