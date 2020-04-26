function searchEcosia(query, callback) {
    var xhr = new XMLHttpRequest()

    xhr.open('GET', `https://skylabcoders.herokuapp.com/proxy?url=https://www.ecosia.org/search?q=${query}`)

    xhr.onload = function () {
        const parser = new DOMParser()

        const doc = parser.parseFromString(this.responseText, 'text/html')

        const main = doc.querySelector('.mainline-results')

        const results = main.querySelectorAll('.js-result')

        const queryResults = []

        results.forEach(result => {
            const title = result.querySelector('.js-result-title').innerHTML

            const content = result.querySelector('.result-snippet').innerHTML

            const link = result.querySelector('.result-url')
           
            queryResults.push({title, content, link})
        })

        callback(queryResults)
    }

    xhr.onerror = function (error) {
        callback(new Error('network error'))
    }

    xhr.send()
}