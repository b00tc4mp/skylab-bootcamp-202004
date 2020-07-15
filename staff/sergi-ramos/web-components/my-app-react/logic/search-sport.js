function searchSport(callback) {
    debugger

    let listResults = []
    var xhr = new XMLHttpRequest()

    xhr.open('GET', `https://skylabcoders.herokuapp.com/proxy?url=https://www.sport.es`)

    xhr.onload = function () {
        //console.log(this.responseText)

        const parser = new DOMParser()

        const doc = parser.parseFromString(this.responseText, 'text/html')

        const results = doc.querySelectorAll('.sp-noticia')
        
        for (var i = 0; i < 10; i++) {
            const title = results[i].querySelector('.title > a').innerHTML

            const { href: link } = results[i].querySelector('.title > a')

            const { src: linkImg } = results[i].querySelector('img')

            listResults.push({ title, link, linkImg })
        }


        callback(listResults)
    }

    xhr.onerror = function (error) {
        console.error('KO', error.message)
    }
    xhr.send()
}