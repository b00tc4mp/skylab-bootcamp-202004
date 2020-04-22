function Results(users) {
    const temp = document.createElement('div')

    temp.innerHTML = `<section class="results">
</section>`

    const container = temp.firstChild

    if (users.length) {
        const list = document.createElement('ul')

        // users.forEach(function (user) {
        users.forEach(function ({ name, surname, email }) {
            const item = document.createElement('li')

            // const { name, surname, email } = user

            item.innerText = `${name} ${surname} (${email})`

            list.appendChild(item)
        })

        container.appendChild(list)
    } else container.appendChild(Feedback('sorry, no results :(', 'warning'))

    return container
}