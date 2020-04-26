class Home extends Component {
    constructor(name, logout, toGoogle) {
        super(`<section class="home">
    <h1>Welcome, ${name}!</h1>
    <button id="logout">Logout</button>
    <button id="google">toGOOGLE</button>
</section>`)

        const buttonLogout = this.container.querySelector('#logout')
        const buttonGoogle = this.container.querySelector('#google')
        buttonLogout.addEventListener('click', function () {
            logout()
        })
        buttonGoogle.addEventListener('click', function () {
            toGoogle()
        })

        let results

        const searchUsersCont= new Search(query => {
            const users = searchUsers(query)

            if (!results) {
                results = new Results(users)

                this.container.appendChild(results.container)
            } else {
                const _results = results

                results = new Results(users)

                _results.container.replaceWith(results.container)
            }

        })

        this.container.appendChild(searchUsersCont.container)
    }
}