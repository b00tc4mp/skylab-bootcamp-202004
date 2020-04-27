function ecosiaSearch(query, processResults) {
    var xhr = new XMLHttpRequest()

    xhr.open( 'GET', `https://skylabcoders.herokuapp.com/proxy?url=https://www.ecosia.org/search?q=${query}` )
    'https://skylabcoders.herokuapp.com/proxy?url=https://www.hola.com/'
    xhr.onload = function () {
        
        const parser = new DOMParser()

        const doc = parser.parseFromString(this.responseText, 'text/html')
        const results = doc.querySelectorAll('.result-body')
        const resultArray = []
        results.forEach(result => {
            const title = result.querySelector('.result-firstline-title').textContent
           
            const content = result.querySelector('.result-snippet-link').textContent
            const { href: link } = result.querySelector('.js-result-url') 
            resultArray.push({title, content, link})
        })
        processResults(undefined, resultArray)
    }

    xhr.onerror = function(error) {
        processResults(new Error('network error'))
    }

    xhr.send()
}