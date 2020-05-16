/**
 * Checks user credentials.
 * 
 * @param {callback} callback The expression to be called after checking credentials, receiving an Error and list of results.
 * 
 * @returns {Error} error It may receive an error in case remote logic fails or there is a network problem.
 * @returns {Object} listResults It receives a array in case credentials are correct.
 * 
 * @throws {Error} If network does not work.
 */

function searchSport(callback) {

    let listResults = []
    var xhr = new XMLHttpRequest()

    xhr.open('GET', `https://skylabcoders.herokuapp.com/proxy?url=https://www.sport.es`)

    xhr.onload = function () {

        const parser = new DOMParser()

        const doc = parser.parseFromString(this.responseText, 'text/html')

        const results = doc.querySelectorAll('.sp-noticia')
        
        for (var i = 0; i < 10; i++) {
            const title = results[i].querySelector('.title > a').innerHTML

            const { href: link } = results[i].querySelector('.title > a')

            const { src: linkImg } = results[i].querySelector('img')

            listResults.push({ title, link, linkImg })
        }

        callback(undefined, listResults)
    }

    xhr.onerror = function (error) {
        callback(error)
    }
    xhr.send()
}
