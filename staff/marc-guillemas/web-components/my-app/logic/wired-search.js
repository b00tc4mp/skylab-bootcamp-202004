function wiredSearch(query, callback) {
    var xhr = new XMLHttpRequest()

    xhr.open( 'GET', `https://skylabcoders.herokuapp.com/proxy?url=https://www.wired.co.uk/topic/${query}` )

    xhr.onload = function () {
        const parser = new DOMParser()

        const doc = parser.parseFromString(this.responseText, 'text/html')

        let results = doc.querySelectorAll('.c-card')

        const data = []

        results.forEach(result => {

            const title = result.querySelector('.c-card__title').innerText

            let {src: image} = result.querySelector('.c-image--lazyload')
            // image = `https://www.wired.co.uk/${image.substring(8)}`

            let { href: link} = result.querySelector('.c-card__link') 
            link = `https://www.wired.co.uk/${link.substring(8)}`
            // link = total+link
            data.push({ image, title, link })
        })
   
        callback(undefined, data)
    }

    xhr.onerror = function(error) {
        callback(new Error('network error'))
    }

    xhr.send()
}
