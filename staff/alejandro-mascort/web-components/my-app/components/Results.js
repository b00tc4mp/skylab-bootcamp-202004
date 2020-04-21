function Results(query) {
    const temp = document.createElement('div')
    const regExp = new RegExp(query)

    const usersFound = users.filter(user => regExp.test(user.name) || regExp.test(user.surname) || regExp.test(user.email))

    if (usersFound.length) {
        temp.innerHTML = ''

        usersFound.forEach(user => temp.innerHTML +=`\n<li class=results__list-item>${user.name} ${user.surname} (${user.email})</li>`)

        temp.innerHTML = '<section class="results">\n<ul class="results__list">\n'+temp.innerHTML+'\n</ul>\n<section>'
    } else {
        temp.innerHTML = '<p class="results__message">There are no matches with your request</p>'
    }
    const container = temp.firstChild

    return container
}