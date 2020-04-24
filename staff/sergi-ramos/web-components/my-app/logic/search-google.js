function searchGoogle(query, callback) {
    let listResults = []
    var xhr = new XMLHttpRequest()

    xhr.open( 'GET', `https://skylabcoders.herokuapp.com/proxy?url=https://www.google.es/search?q=${query}` )

    xhr.onload = function () {
        //console.log(this.responseText)

        const parser = new DOMParser()

        const doc = parser.parseFromString(this.responseText, 'text/html')

        const results = doc.querySelectorAll('.rc')

        results.forEach(result => {
            const title = result.querySelector('.LC20lb').innerHTML
            
            const content = result.querySelector('.st').innerHTML

            const { href: link } = result.querySelector('.r > a')

            listResults.push({title, content, link})
        })
       
            
           callback(listResults)
    }
    xhr.onerror = function(error) {
        console.error(error)
    }

    xhr.send()
}