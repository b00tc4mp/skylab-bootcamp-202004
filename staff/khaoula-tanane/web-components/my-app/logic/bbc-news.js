function bbcNews(callback) {
    var xhr = new XMLHttpRequest()

    xhr.open( 'GET', `https://skylabcoders.herokuapp.com/proxy?url=https://https://www.hola.com/` )

    xhr.onload = function () {
        const parser = new DOMParser()

        const doc = parser.parseFromString(this.responseText, 'text/html')

        let results = doc.querySelectorAll('.StoryPromoUl-sc-171lqjd-1')

        const data = []

        results.forEach(result => {
            const title = result.querySelector('.Headline-sc-1dvfmi3-3').innerText

            const { href: link } = result.querySelector('.Link-sc-1dvfmi3-5') 

            data.push({ title, link })
        })
   
        callback(undefined, data)
    }

    xhr.onerror = function(error) {
        callback(new Error('network error'))
    }

    xhr.send()
}
