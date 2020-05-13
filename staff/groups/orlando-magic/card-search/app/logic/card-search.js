function searchCard(query, callback){
    Function.validate(callback)
    String.validate.notVoid(query)

    let url =  `https://api.scryfall.com/cards/search?${query}`

    const xhr = new XMLHttpRequest()

    xhr.open('GET',url)
    xhr.onload = function() {

        if (this.status == 200) {
            const {data} = JSON.parse(this.responseText)
            callback(undefined,data)
        } else if (this.status === 404){
            const { details } = JSON.parse(this.responseText)
            callback(new Error(details), [])
        }
    }

    xhr.onerror = function() {
        callback(new Error('network error'))
    }
    xhr.send()
}
