export {
    isJSON,
    numberWithCommas,
    formatIntoDollars,
    randomIntFromInterval,
    scrollToTop,
    formatDate,
    generateArrayForTable,
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

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    })
}

function generateArrayForTable(data) {
    if (!data) return null

    const { production_companies, production_countries, budget, revenue } = data

    return [
        {
            name: 'Production companies',
            value:
                production_companies.reduce((stack, el) => {
                    if (stack.length === 0) {
                        return el.name
                    } else {
                        return `${stack}, ${el.name}`
                    }
                }, '') || 'Unknown',
        },
        {
            name: 'Production countries',
            value:
                production_countries.reduce((stack, el) => {
                    if (stack.length === 0) {
                        return el.name
                    } else {
                        return `${stack}, ${el.name}`
                    }
                }, '') || 'Unknown',
        },
        { name: 'Budget', value: budget || 0 },
        { name: 'Revenue', value: revenue || 0 },
    ]
}
