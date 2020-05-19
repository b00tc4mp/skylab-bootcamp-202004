function latestNews(callback) {
    var xhr = new XMLHttpRequest()
    
    xhr.open('GET', 'https://skylabcoders.herokuapp.com/proxy?url=https://www.3djuegos.com/')

    
    xhr.onload = function() {
        const parser = new DOMParser()

        const doc = parser.parseFromString(this.responseText, 'text/html')
        
        let results = doc.querySelectorAll('.nov_main')

        const data = []

        results.forEach(result => {
            //const { src: imgLink } = result.querySelector('.img > img')

            const { href: link } = result.querySelector('.nov_main_txt > a')

            const title = result.querySelector('.nov_main_txt > a > h3').innerText

            const content = result.querySelector('.dn600').innerText

            data.push({link, title, content})
        })

        callback(undefined, data)
    }

    xhr.onerror = error => { callback(new Error('network error')) }

    xhr.send()
}

// latestNews((error, data) => {
//     if (error) return error.message;
//     else console.log(data);
// })