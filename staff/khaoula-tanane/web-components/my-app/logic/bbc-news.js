function bbcNews(callback) {
    var xhr = new XMLHttpRequest()

    xhr.open( 'GET', `https://skylabcoders.herokuapp.com/proxy?url=https://www.bbc.com/mundo/` )

    xhr.onload = function () {
        const parser = new DOMParser()

        const doc = parser.parseFromString(this.responseText, 'text/html')

        let results = doc.querySelectorAll('.FirstSectionTopMargin-sc-1t555e8-1 li')

        const data = []

        results.forEach(result => {
            // const title = result.querySelector('.Headline-sc-1dvfmi3-3').innerText

            // const { href: link } = result.querySelector('.Link-sc-1dvfmi3-5') 

            // const img = result.querySelector('img')

            data.push({result})
        })
   
        callback(undefined, data)
    }

    xhr.onerror = function(error) {
        callback(new Error('network error'))
    }

    xhr.send()
}