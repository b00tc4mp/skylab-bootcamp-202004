function Results(_users) {
    const temp = document.createElement('div')

    temp.innerHTML = `<section class="results">
</section>`

    const container = temp.firstChild

    if (_users.length) {
        const list = document.createElement('ul')

        _users.forEach(function ({ name, surname, email }) {
            const item = document.createElement('li')

            item.innerText = `${name} ${surname} ${email}`

            list.appendChild(item)
        })

        container.appendChild(list)
    } else container.appendChild(new Feedback('sorry, no results :(', 'warning').container)

    return container
}