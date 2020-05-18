
function google(query, callback) {
    if (typeof query !== 'string') throw new TypeError(`${query} is not a string`)
    if (!query.trim().length) throw Error('query is empty')

    var xhr = new XMLHttpRequest()

    xhr.open( 'GET', `https://skylabcoders.herokuapp.com/proxy?url=https://www.google.com/search?q=${query}`)

    xhr.addEventListener('load', function() {
        const parser = new DOMParser()

        const doc = parser.parseFromString(this.responseText, 'text/html')

        let results = doc.querySelectorAll('.rc')

        const data = []

        results.forEach(result => {
            const title = result.querySelector('.LC20lb').innerText

            const content = result.querySelector('.st').innerText

            const { href: link } = result.querySelector('.r > a') 

            data.push({ title, content, link })
        })
   
        callback(undefined, data)

    })

    xhr.addEventListener('error', () => {
        callback(new Error('network error'))
  
    })

    xhr.send()
}



