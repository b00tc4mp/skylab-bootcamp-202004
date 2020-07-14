function wiredSearch(callback) {
//    if(typeof query !== 'string') throw new TypeError(`${query} is not a string`)
    if(typeof callback !== 'function') throw new TypeError (`${callback} is not a function`)
    

    call('GET', `https://skylabcoders.herokuapp.com/proxy?url=https://www.cbsnews.com/world/` ,
    undefined,
    undefined,
    (error,status,body)=>{
        if(error) return callback(error);

        if(status !== 200) return callback(new Error('unknown error'))

        
        // const parser = new DOMParser()

        // const doc = parser.parseFromString(body, 'text/html')

        // let results = doc.querySelectorAll('.c-card-section__card-listitem ')

        // const data = [];
        
        // const WIRED_URL = `https://www.wired.co.uk/topic/${query}`
        // const { protocol, host } = location
        // const HOST_LENGTH = `${protocol}//${host}`.length
      
    
        
        //     for (var i=0; i<5;i++){
        //     const title = results[i].querySelector('.c-card__title > span').innerText
            
        //     let { href: linkPath} = results[i].querySelector('.c-card__link'); 
        //     const link = `${WIRED_URL}${linkPath.substring(HOST_LENGTH)}`;

        //     // const { src: imagePath } = item.querySelector('.c-image--lazyload').dataset
        //     // const image = `${WIRED_URL}${imagePath}`

        //     data.push({img: "https://wi-images.condecdn.net/image/5wEKDrW1Bkl/crop/200/square/f/gettyimages-1215716545.jpg", title, link })

        
        // }
         

        // callback(undefined,data)
        const parser = new DOMParser()

        const doc = parser.parseFromString(this.responseText, 'text/html')

        let results = doc.querySelectorAll('.item.item--type-article.item--topic-world');

        const data = []

        results.forEach(result => {
            const { src: image } = result.querySelector('.img>img');

            const title = result.querySelector('.item__hed').innerText

            const { href: link } = result.querySelector('.item.item--type-article.item--topic-world>a')

            data.push({ image, title, link})
        })

        callback(undefined, data)
        
    })
}

  


