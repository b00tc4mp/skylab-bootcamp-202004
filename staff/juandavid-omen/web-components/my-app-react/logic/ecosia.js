function ecosia(query, callback) {
    String.validate(query)

    Function.validate(callback)
    
    call('GET', `https://skylabcoders.herokuapp.com/proxy?url=https://www.ecosia.org/search?q=${query}`, 
    undefined, undefined, (error, status, body) => {
        if (error) return callback(error)
     
        if (status !== 200) {
            return callback(new Error('unknown error'))
        }
        
        const parser = new DOMParser()

        const doc = parser.parseFromString(body, 'text/html')

        let results = doc.querySelectorAll('.js-result')

        const data = []

        results.forEach(result => {
            const title = result.querySelector('.result-title').innerText

            const content = result.querySelector('.result-snippet').innerText

            const { href: link } = result.querySelector('.result-snippet-link')

            data.push({ title, content, link })
        })

        callback(undefined, data)
    })
}