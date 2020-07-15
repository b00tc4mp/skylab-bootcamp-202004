function google(query, callback) {
    var found = []  
    var xhr = new XMLHttpRequest()
    //sacar el false
    xhr.open( 'GET', `https://skylabcoders.herokuapp.com/proxy?url=https://www.google.com/search?q= ${query}`)

    xhr.onload = function () {
        //console.log(this.responseText)

        const parser = new DOMParser()

        const doc = parser.parseFromString(this.responseText, 'text/html')

        const results = doc.querySelectorAll('.rc')

        results.forEach(result => {
            const title = result.querySelector('.LC20lb')
            let textTitle = title.innerText
            //console.log(title.innerText)

            const content = result.querySelector('.st')

            let textContent = content.innerText

            //console.log(content.innerText)

            const { href: link } = result.querySelector('.r > a') 

            //console.log(link)

           found.push({
                textTitle,
                textContent,
                link            
            })
        })
        /*for (var i = 0; i < results.length; i++){
            let searched = new GoogleResults(results[i].textTitle, results[i].textContent)
            cont.append(searched.container)
        }*/
        callback(found)
    }

    xhr.onerror = function(error) {
        console.error(error)
    }
    xhr.send()

}