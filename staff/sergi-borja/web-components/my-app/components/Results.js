function Results(users) {
    const container = mount(`<section class="results">
    </section>`)

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