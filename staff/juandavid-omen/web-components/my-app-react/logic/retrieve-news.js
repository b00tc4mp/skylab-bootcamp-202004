
function retrieveNews(callback) {
    var xhr = new XMLHttpRequest();

    const NEWS_URL = 'https://www.vilaweb.cat/';

    xhr.open('GET', `https://skylabcoders.herokuapp.com/proxy?url=${NEWS_URL}`);

    xhr.onload = function () {
        const parser = new DOMParser()//bloc-subtitular-container

        const doc = parser.parseFromString(this.responseText, 'text/html')

        let results = doc.querySelectorAll('li.bloc-parent')

        const data = []

        results.forEach(result => {
            const content = result.querySelector('.link-noticia').innerText

            const { href: link } = result.querySelector('.link-noticia')

            let image = ''
            const imageNode = result.querySelector('img.vw-item-img')
            if (imageNode) {
                image = imageNode.getAttribute('ng-src')
            }
            data.push({ image, content, link })
        })

        callback(undefined, data)
    }

    xhr.onerror = function (error) {
        callback(new Error(`network error: ${error}`))
    }

    xhr.send()
}

/* 
function retrieveHolaNews(callback) {
    var xhr = new XMLHttpRequest()

    const HOLA_URL = 'https://us.hola.com'
    const { protocol, host } = location
    const HOST_LENGTH = `${protocol}//${host}`.length

    xhr.open('GET', `https://skylabcoders.herokuapp.com/proxy?url=${HOLA_URL}`)

    xhr.onload = function () {
        const parser = new DOMParser()

        const doc = parser.parseFromString(this.responseText, 'text/html')

        let items = doc.querySelectorAll('.highlighted__item')

        const data = []

        items.forEach(item => {
            const { href: linkPath } = item.querySelector('a')
            const link = `${HOLA_URL}${linkPath.substring(HOST_LENGTH)}`

            const { src: imagePath } = item.querySelector('img').dataset
            const image = `${HOLA_URL}${imagePath}`

            const text = item.querySelector('h2').innerText

            data.push({ image, link, text })
        })

        callback(undefined, data)
    }

    xhr.onerror = function (error) {
        callback(new Error('network error'))
    }

    xhr.send()
}
 */