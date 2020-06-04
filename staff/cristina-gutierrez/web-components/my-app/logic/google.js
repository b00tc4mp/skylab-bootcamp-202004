function google(query) {

    var xhr = new XMLHttpRequest()

    //https://skylabcoders.herokuapp.com/proxy?url=https://www.google.com/search?q=$%7Bquery%7D

    xhr.open( 'GET', `https://skylabcoders.herokuapp.com/proxy?url=https://www.google.com/search?q=${query}` )

    let _results = []

    xhr.onload = function () {
        //console.log(this.responseText)

        const parser = new DOMParser()

        const doc = parser.parseFromString(this.responseText, 'text/html')

        let results = doc.querySelectorAll('.rc')

        results.forEach(result => {
            const title = result.querySelector('.LC20lb').innerText

            // console.log(title.innerText)

            const content = result.querySelector('.st').innerText

            // console.log(content.innerText)

            const { href: link } = result.querySelector('.r > a')

            // console.log(link)
            _results.push({title, content, link})
        })
    }

    xhr.onerror = function(error) {
        console.error(error)
    }

    xhr.send()

    return _results
}

console.log(google(skylab))