function dailyNews(callback) {
    var xhr = new XMLHttpRequest()

    xhr.open('GET', `https://skylabcoders.herokuapp.com/proxy?url=https://www.nytimes.com/es/`)

    xhr.onload = function () {

        const parser = new DOMParser()

        const doc = parser.parseFromString(this.responseText, 'text/html')

        const firstPart = doc.querySelector('.css-gfgt40')

        const articles = firstPart.querySelectorAll('.ekkqrpp3')

        const news = []

        articles.forEach(result => {
            const section = result.querySelector('.e4e4i5l0').innerHTML

            const title = result.querySelector('.e4e4i5l1 > a').innerHTML

            const content = result.querySelector('.e4e4i5l4').innerHTML

            let { href: link } = result.querySelector('.e4e4i5l1 > a')

            link = `https://www.nytimes.com/${link.substring(8)}`

            const {src: image} = result.querySelector('img')

            news.push({section, title, content, link, image})
        })

        callback(news)
    }

    xhr.onerror = function (error) {
        callback(new Error('network error'))
    }

    xhr.send()
}
