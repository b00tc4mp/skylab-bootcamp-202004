function retrieveNews(callback) {
    const NEWS_URL = 'https://www.vilaweb.cat/';

    call('GET', `https://skylabcoders.herokuapp.com/proxy?url=${NEWS_URL}`, undefined, undefined, 
    () => { debugger
        const parser = new DOMParser()

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
    })
}