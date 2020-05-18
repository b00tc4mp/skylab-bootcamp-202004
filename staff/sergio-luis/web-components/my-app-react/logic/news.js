
function searchNews(callback) {
    if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)
  
    call('GET', `https://skylabcoders.herokuapp.com/proxy?url=https://www.cbsnews.com/world/`,
    undefined,
    undefined,
    (error,status,body)=>{
        if(error) return callback(error);
        if(status!== 200) return callback(new Error('unknow error'))
        const parser = new DOMParser()

        const doc = parser.parseFromString(body, 'text/html')

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
}
