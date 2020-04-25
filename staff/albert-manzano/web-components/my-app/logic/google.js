function google(query,callback) {
    var xhr = new XMLHttpRequest()
    

    xhr.open( 'GET', `https://skylabcoders.herokuapp.com/proxy?url=https://www.google.com/search?q=${query}` )

    xhr.onload = function () {
        const parser = new DOMParser()

        const doc = parser.parseFromString(this.responseText, 'text/html')

        const results = doc.querySelectorAll('.rc')

        var items=[];

        results.forEach(result => {
            const title = result.querySelector('.LC20lb').innerText


            const description = result.querySelector('.st').innerText


            const { href: link } = result.querySelector('.r > a') 

            items.push({link,title,description});
        })
        callback(undefined,items)
    }

    xhr.onerror = function(error) {
        callback(new Error('network error'))
    }

    xhr.send()
    
}

