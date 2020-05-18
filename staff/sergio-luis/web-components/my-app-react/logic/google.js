
function searchGoogle(query, callback) {
    if (typeof query !== 'string') throw new TypeError(`${query} is not a string`)
    if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)
  
    call('GET', `https://skylabcoders.herokuapp.com/proxy?url=https://www.google.com/search?q=${query}`,
    undefined,
    undefined,
    (error,status,body)=>{
        if(error) return callback(error);
        if(status!== 200) return callback(new Error('unknow error'))

        const parser = new DOMParser()

        const doc = parser.parseFromString(body, 'text/html')

        let results = doc.querySelectorAll('.rc')

        const data = []

        results.forEach(result => {
            const title = result.querySelector('.LC20lb').innerText

            const content = result.querySelector('.st').innerText

            const { href: link } = result.querySelector('.r > a') 

            data.push({ title, content, link })
        })
   
        callback(undefined, data)
    })
}



