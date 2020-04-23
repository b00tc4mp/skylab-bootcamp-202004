function Home(name, callback) {
    const container = mount(`<section class="home">
    <h1>Welcome, ${name}!</h1><button>Logout</button>
</section>`)

    const button = container.querySelector('button')

    button.addEventListener('click', function () {
        callback()
    })

    let results

    container.appendChild(Search(function (query) {
        const users = searchUsers(query)

        if (!results) {
            results = Results(users)

            container.appendChild(results)
        } else {
            const _results = results

            results = Results(users)

            _results.replaceWith(results)
        }
    }))

    return container
}