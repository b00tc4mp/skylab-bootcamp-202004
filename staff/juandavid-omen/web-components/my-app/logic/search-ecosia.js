function searchEcosia(query, callback) {
    var xhr = new XMLHttpRequest()

    xhr.open('GET', `https://skylabcoders.herokuapp.com/proxy?url=https://www.ecosia.org/search?q=${query}`)

    xhr.onload = function () {
        const parser = new DOMParser()

        const doc = parser.parseFromString(this.responseText, 'text/html')

        let results = doc.querySelectorAll('.js-result')

        const data = []

        results.forEach(result => {
            const title = result.querySelector('.result-title').innerText

            const content = result.querySelector('.result-snippet').innerText

            const { href: link } = result.querySelector('.result-snippet-link')

            data.push({ title, content, link })
        })

        callback(undefined, data)
    }

    xhr.onerror = function (error) {
        callback(new Error(`network error: ${error}`))
    }

    xhr.send()
}
