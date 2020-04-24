
function searchUsers(query) {
    // TODO find users matching query in name, surname, email

    if(!query) return []

    let _users = users.filter(function(user) {
        return user.name.includes(query) || user.email.includes(query) || user.surname.includes(query)
        // TODO match user.name contains query || user.surname contains query || ...
    })

    _users = _users.map(({name, surname, email}) => {
        return {name, surname, email}
    })

    // TODO sanitize: create new objects of users without password

    return _users
    // TODO return _users
}

// function search(query) {
//     var xhr = new XMLHttpRequest()

//     xhr.open( 'GET', `https://www.google.com/search?q=${query}` )

//     xhr.onload = function () {
//         //console.log(this.responseText)

//         const parser = new DOMParser()

//         const doc = parser.parseFromString(this.responseText, 'text/html')

//         const results = doc.querySelectorAll('.rc')

//         results.forEach(result => {
//             const title = result.querySelector('.LC20lb')

//             console.log(title.innerText)

//             const content = result.querySelector('.st')

//             console.log(content.innerText)

//             const { href: link } = result.querySelector('.r > a') 

//             console.log(link)
//         })
//     }

//     xhr.onerror = function(error) {
//         console.error(error)
//     }

//     xhr.send()
// }