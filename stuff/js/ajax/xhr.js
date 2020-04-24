function search(query) {
    var xhr = new XMLHttpRequest()

    xhr.open( 'GET', `https://www.google.com/search?q=${query}` )

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

search('skylab')

// but this only works if i run this script from a google.com page because of CORS policy

// one way to bypass this would be using a proxy, as follows:

function search(query) {
    var xhr = new XMLHttpRequest()

    xhr.open( 'GET', `https://skylabcoders.herokuapp.com/proxy?url=https://www.google.com/search?q=${query}` )

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

search('skylab')

// now this works from any page (from any domain), but WARN! a proxy could be black-listed, so do not abuse of it.
