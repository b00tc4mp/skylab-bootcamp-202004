function news20 (callback) { 
    var found = []  
    var xhr = new XMLHttpRequest()
    //sacar el false
    xhr.open( 'GET', `https://skylabcoders.herokuapp.com/proxy?url=https://www.20minutos.es/minuteca/espana/`)
    

    xhr.onload = function () { 
        //console.log(this.responseText)

        const parser = new DOMParser()

        const doc = parser.parseFromString(this.responseText, 'text/html')

        const results = doc.querySelectorAll('.media-content') 

        for(var i = 0; i < 6; i++) { 
            const title = results[i].querySelector('a')
            let textTitle = title.innerText
            //console.log(title.innerText)

            //const content = result.querySelector('.st')

            //let textContent = content.innerText

            //console.log(content.innerText)

            const { href: link } = results[i].querySelector('a') 

            //console.log(link)

          found.push({
                textTitle,
                link            
            })
        }
        callback(found)
    }

    xhr.onerror = function(error) {
        console.error(error)
    }
    xhr.send()
}