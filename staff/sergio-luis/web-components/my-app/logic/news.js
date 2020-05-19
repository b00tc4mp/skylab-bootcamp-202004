function news(callback) {

    var xhr = new XMLHttpRequest()

    xhr.open('GET', `https://skylabcoders.herokuapp.com/proxy?url=https://www.cbsnews.com/world/`)

    //xhr.onload = function () {
    xhr.addEventListener('load', function() {
        const parser = new DOMParser()

        const doc = parser.parseFromString(this.responseText, 'text/html')

        let results = doc.querySelectorAll('.item.item--type-article.item--topic-world');

        const data = []

        for(var i=0; i<7 ;i++){
            const { src: image } = results[i].querySelector('.img>img');

            const title = results[i].querySelector('.item__hed').innerText

            const { href: link } = results[i].querySelector('.item.item--type-article.item--topic-world>a')

            data.push({ image, title, link})
        }

        callback(undefined, data)
    
    })

    //xhr.onerror = function(error) {
    xhr.addEventListener('error', () => {
        callback(new Error('network error'))
            //}
    })


    xhr.send()
}