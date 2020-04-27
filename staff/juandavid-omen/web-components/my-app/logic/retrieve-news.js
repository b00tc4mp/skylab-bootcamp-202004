//class="article-h-link "
function retrieveNews(callback) {
    var xhr = new XMLHttpRequest()

    xhr.open('GET', `https://skylabcoders.herokuapp.com/proxy?url=https://www.vilaweb.cat/`)

    xhr.onload = function () {
        const parser = new DOMParser()

        const doc = parser.parseFromString(this.responseText, 'text/html')

        let results = doc.querySelectorAll('.article.short')

        const data = []

        results.forEach(result => {
            const title = result.querySelector('.link-noticia').innerText

            const content = result.querySelector('.link-noticia').innerText

            const { href: link } = result.querySelector('.link-noticia')

           // const { src: image} = result.querySelector('.article-image')
           const image = '';

            data.push({ title, content, link, image})
        })

        callback(undefined, data)
    }

    xhr.onerror = function (error) {
        callback(new Error(`network error: ${error}`))
    }

    xhr.send()
}
