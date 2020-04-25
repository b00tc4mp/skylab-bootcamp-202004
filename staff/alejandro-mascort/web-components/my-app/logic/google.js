function google(query, callback) {
    var xhr = new XMLHttpRequest()

    xhr.open( 'GET', `https://skylabcoders.herokuapp.com/proxy?url=https://www.google.com/search?q=${query}`)

    xhr.onload = function () {
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
    }

    xhr.onerror = error => {
        callback(new Error('network error'))
    }

    xhr.send()
}

// var googleResults
// google('skylab',function(error, data) {
//     if (error) return error.message;
//     else googleResults = data;
//     debugger
// })