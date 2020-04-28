function search(query, callback) {
    if (typeof query !== 'string') throw new TypeError(`${query} is not a string`)
    if (!query.trim().length) throw Error('query is empty')

    var xhr = new XMLHttpRequest()

    xhr.open( 'GET', `https://skylabcoders.herokuapp.com/proxy?url=https://www.google.com/search?q=${query}`)

    //xhr.onload = function () {
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
    //}
    })

    //xhr.onerror = function(error) {
    xhr.addEventListener('error', () => {
        //throw new Error('network error')
        callback(new Error('network error'))
    //}
    })

    xhr.send()
}

// in presentation layer (in the compos)
try {
    search('hola mundo', function(error, results) {
        if (error) console.error('KO', error.message)
        else {
            console.log('OK', results)

            document.body.innerHTML = '<h1>Ok, results already here!</h1>'
        }
    })

    document.body.innerHTML = '<h1>searching... please, wait</h1><img src="https://media.giphy.com/media/2WjpfxAI5MvC9Nl8U7/giphy.gif">'

    document.querySelector('img').addEventListener('click', function() { console.log('IMG clicked') })

    // do more stuff
} catch(error) {
    console.error('KO', error.message)
}


