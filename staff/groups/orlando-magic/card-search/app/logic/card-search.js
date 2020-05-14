/**
 * Takes a query and executes the search following the Scryfall API protocol.
 * 
 * @param {string} query A processed search input generated with the function createUrl. 
 * @param {callback} callback The expression to be called after retrieving the results, which receives an Error or an array of results.
 * 
 * @throws {TypeError} If the query is not a string.
 * @throws {Error} If callback is not a function.
 */

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

/**
 * Invoked after retrieving the results.
 * 
 * @callback callback
 * @param {Error} error It will receive an error when remote logic fails or there is a network problem.
 * @param {string} results It receives an array of cards objects representing the search results or an empty array when there are no results.
 */