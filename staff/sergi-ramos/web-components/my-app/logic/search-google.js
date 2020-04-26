function searchGoogle(query, callback) {

if(typeof query !== 'string') throw new TypeError(query + ' is not a String')
if(!query.trim().length) throw new Error('Sorry the search is empty or blank')

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
         if(typeof listResults === 'undefined') throw Error ('No results obtained, try again')
           callback(undefined, listResults)
    }

    xhr.onerror = function(error) {
        console.error('KO', error.message)
    }
    xhr.send()
}