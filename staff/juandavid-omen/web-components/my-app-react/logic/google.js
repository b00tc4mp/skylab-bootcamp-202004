function google(query, callback) {
    call('GET', `https://skylabcoders.herokuapp.com/proxy?url=https://www.google.com/search?q=${query}`, 
    undefined, undefined, (error, status, body) => {
        if (error) return callback(error)
        
        if (status !== 200) {
            return callback(new Error('unknown error'))
        }

        const parser = new DOMParser()

        const doc = parser.parseFromString(body, 'text/html')

        let results = doc.querySelectorAll('.rc')
        
        let data

        if (results.length > 0) {
            data = extractData(results, '.LC20lb', '.st', '.r > a')
            callback(undefined, data)
        } else {
            results = doc.querySelectorAll('.xpd')

            data = extractData(results, '.v0nnCb > div', '.MUxGbd', '.BmP5tf')

            callback(undefined, data)
        }

        callback(undefined, data)
    })
}

function extractData(results, titleTag, contentTag, linkTag) {
    const data = []
  
    results.forEach(result => {
        const title = result.querySelector(titleTag).innerText

        const content = result.querySelector(contentTag).innerText

        const { href: link } = result.querySelector(linkTag)

        data.push({ title, content, link })
    })

    return data
}