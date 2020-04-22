// TODO show "Welcome, <name>!"
class Home extends Components {

    constructor(user, logOut) {
        super(`<section class="home">
                    <h1>Bienvenido ${user}</h1>
                    <button>Logout</button>
                </section>`)

        const search = new Search()

        this.container.appendChild(search.container)

        const logOutButton = this.container.querySelector('button')

        logOutButton.addEventListener('click', function () {

            logOut()
        })
        let result
        const self = this
        const searchButton = this.container.querySelector('form')
        searchButton.addEventListener('submit', function (event) {
            event.preventDefault()

            const query = event.target.query.value
            const user = searchUser(query)
            if (!result) {
                result = new Result(user)
                self.container.append(result.container)
            } else {
                self.container.removeChild(result.container)
                result.container = undefined
                result = new Result(user)
                self.container.append(result.container)
            }
        })
    }
}




