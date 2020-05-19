function amazon(query, callback) {

    var xhr = new XMLHttpRequest();

    xhr.open('GET', `https://skylabcoders.herokuapp.com/proxy?url=https://www.amazon.com/s?k=${query}`)
        xhr.onload = function () {
        const parser = new DOMParser()
        const doc = parser.parseFromString(this.responseText, 'text/html')
        const results = doc.querySelectorAll('.a-spacing-medium')
        var items = [];
        results.forEach(result => {
            let price = result.querySelector('.a-price-whole')
            let image = result.querySelector('.s-image')
            let content = result.querySelector('.a-text-normal')
            let link = result.querySelector('.a-link-normal')
            if (price !== null && image !== null && content !== null && link !== null) {
                image = image.attributes[0]
                price = price.innerText
                content = content.innerText
                link = link.href
                items.push({
                    link,
                    content,
                    image,
                    price
                });
            }
        });

        callback(undefined, items);
    }
        xhr.onerror = function (error) {
        callback(new Error('network error'));
    }
    xhr.send();

}