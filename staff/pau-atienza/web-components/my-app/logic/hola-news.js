function holaNews(callback) {
    var xhr = new XMLHttpRequest()
    
    xhr.open( 'GET', 'https://skylabcoders.herokuapp.com/proxy?url=https://us.hola.com/' )

    xhr.onload = function () {
        const parser = new DOMParser()

        const doc = parser.parseFromString(this.responseText, 'text/html')

        let results = doc.querySelectorAll('.highlighted__item')

        const news = []

        results.forEach((result) => {
            const title = result.querySelector('h2').innerText
            
            let image= result.querySelector('.highlighted__image')
            image = 'https://us.hola.com/' + image.dataset.src

            let { href: link } = result.querySelector('.highlighted__item > a')
            link = 'https://us.hola.com/' + link.slice(10);
            news.push({ title, image, link })
        })

        callback(undefined, news)
    }
    
    xhr.onerror = function(error){
        callback(new Error('network error'))
    }

    xhr.send()
}