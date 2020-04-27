function search(query) {
    var xhr = new XMLHttpRequest()

    xhr.open( 'GET', `https://skylabcoders.herokuapp.com/proxy?url=https://www.google.com/search?q=$%7Bquery%7D` )

    xhr.onload = function () {
        //console.log(this.responseText)

        const parser = new DOMParser()

        const doc = parser.parseFromString(this.responseText, 'text/html')

        const results = doc.querySelectorAll('.rc')

        results.forEach(result => {
            const title = result.querySelector('.LC20lb')

            console.log(title.innerText)

            const content = result.querySelector('.st')

            console.log(content.innerText)

            const { href: link } = result.querySelector('.r > a') 

            console.log(link)
        })
    }

    xhr.onerror = function(error) {
        console.error(error)
    }

    xhr.send()
}