function googleSearch(query, processResults) {

    debugger
    var xhr = new XMLHttpRequest()
    xhr.resultArray = []
    // var resultArray = []
    xhr.open( 'GET', `https://skylabcoders.herokuapp.com/proxy?url=https://www.google.com/search?q=${query}`)

    xhr.onload = function () {
        //console.log(this.responseText)
        const parser = new DOMParser()
        debugger
        const doc = parser.parseFromString(this.responseText, 'text/html')

        const results = doc.querySelectorAll('.rc')
        
        // this.resultArray = []
        results.forEach((result, i) => {
            const title = result.querySelector('.LC20lb')
            debugger
            const content = result.querySelector('.st')
            const { href: link } = result.querySelector('.r > a') 
            xhr.resultArray[i] = {title, content, link}
        })
        
    }

    xhr.onerror = function(error) {
        console.error(error)
    }
    debugger
    xhr.send()
    
    
    return  xhr.resultArray
    
    
}