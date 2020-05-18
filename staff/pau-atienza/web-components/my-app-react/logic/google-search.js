function googleSearch(query, processResults) {
    var xhr = new XMLHttpRequest()

    xhr.open( 'GET', `https://skylabcoders.herokuapp.com/proxy?url=https://www.google.com/search?q=${query}`)
    xhr.onload = function () {
        const parser = new DOMParser()

        const doc = parser.parseFromString(this.responseText, 'text/html')
        const results = doc.querySelectorAll('.rc')
        const resultArray = []
        results.forEach(result => {
            const title = result.querySelector('.LC20lb').textContent
           
            const content = result.querySelector('.st').textContent
            const { href: link } = result.querySelector('.r > a') 
            resultArray.push({title, content, link})
        })
        processResults(undefined, resultArray)
    }
    xhr.onerror = function(error) {
        processResults(new Error('network error'))
    }
    xhr.send()
}