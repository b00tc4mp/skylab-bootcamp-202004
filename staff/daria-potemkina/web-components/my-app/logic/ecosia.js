function searchEcosia(query, callback) {
    if (typeof query !== 'string') throw new TypeError(`${query} is not a string`)
    if (!query.trim().length) throw Error('query is empty')
    
    var xhr = new XMLHttpRequest()

    xhr.open('GET', `https://skylabcoders.herokuapp.com/proxy?url=https://www.ecosia.org/search?q=${query}`)

    xhr.onload = function () {
        const parser = new DOMParser()

        const doc = parser.parseFromString(this.responseText, 'text/html')

        const main = doc.querySelector('.mainline-results')

        const results = main.querySelectorAll('.js-result')

        const queryResults = []

        results.forEach(result => {
            const title = result.querySelector('.js-result-title').innerText

            const content = result.querySelector('.result-snippet').innerText

            const { href: link} = result.querySelector('.result-url')
           
            queryResults.push({title, content, link})
        })

        callback(undefined, queryResults)
    }

    xhr.onerror = function (error) {
        callback(new Error('network error'))
    }

    xhr.send()
}