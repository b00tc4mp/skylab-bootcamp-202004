function Home(name, callback) {
    Component.call(this, `<section class="home">
    <h1>Welcome, ${name}!</h1><button>Logout</button>
</section>`)

    const button = this.container.querySelector('button')

    button.addEventListener('click', function () {
        callback()
    })

    let results

    const self = this

    this.container.appendChild(new Search(function (query) {
        const users = searchUsers(query)

        if (!results) {
            results = new Results(users)

            //this.container.appendChild(results.container)
            self.container.appendChild(results.container)
        } else {
            const _results = results

            results = new Results(users)

            _results.container.replaceWith(results.container)
        }
    }).container)
}

Home.prototype = Object.create(Component.prototype)
Home.prototype.constructor = Home