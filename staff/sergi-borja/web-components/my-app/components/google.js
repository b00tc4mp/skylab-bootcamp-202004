function search(query) {
    var xhr = new XMLHttpRequest()

    xhr.open( 'GET', `https://www.google.com/search?q=${query}` )

    xhr.onload = function () {

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