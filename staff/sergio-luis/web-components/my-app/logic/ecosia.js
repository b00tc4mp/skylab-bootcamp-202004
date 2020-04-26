
function ecosia(query, callback) {
    if (typeof query !== 'string') throw new TypeError(`${query} is not a string`)
    if (!query.trim().length) throw Error('query is empty')

    var xhr = new XMLHttpRequest()

    xhr.open( 'GET', `https://skylabcoders.herokuapp.com/proxy?url=https://www.ecosia.org/search?q=${query}`)

    xhr.addEventListener('load', function() {
        const parser = new DOMParser()

        const doc = parser.parseFromString(this.responseText, 'text/html')

        let results = doc.querySelectorAll('.js-result')

        const data = []

        results.forEach(result => {
            const title = result.querySelector('.result-title').innerText

            const content = result.querySelector('.result-snippet').innerText

            const { href: link } = result.querySelector('.result-snippet-link') ;
      

            data.push({ title, content, link })
        })
   
        callback(undefined, data)
    })

    xhr.addEventListener('error', () => {
        callback(new Error('network error'))
    })


    xhr.send()
}



