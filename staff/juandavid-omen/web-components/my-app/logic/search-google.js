function searchGoogle(query, callback) {
    var xhr = new XMLHttpRequest()

    xhr.open('GET', `https://skylabcoders.herokuapp.com/proxy?url=https://www.google.com/search?q=${query}`)

    xhr.onload = function () {
        const parser = new DOMParser()

        const doc = parser.parseFromString(this.responseText, 'text/html')

        let results = doc.querySelectorAll('.rc')
        
        let data;

        if (results.length > 0) {
            data = extractData(results, '.LC20lb', '.st', '.r > a');
            callback(undefined, data);
        } else {
            results = doc.querySelectorAll('.xpd')

            data = extractData(results, '.v0nnCb > div', '.MUxGbd', '.BmP5tf');
            callback(undefined, data);
        }

        
    }

    xhr.onerror = function (error) {
        callback(new Error('network error'));
    }

    xhr.send()
}
function extractData(results, titleTag, contentTag, linkTag) {
    const data = []
  
    results.forEach(result => {
        const title = result.querySelector(titleTag).innerText;

        const content = result.querySelector(contentTag).innerText;

        const { href: link } = result.querySelector(linkTag);

        data.push({ title, content, link });
    })
    return data
}

