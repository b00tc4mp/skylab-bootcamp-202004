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

        logOutButton.addEventListener('click',  () => {

            logOut()
        })
        let result

        const searchButton = this.container.querySelector('form')
        searchButton.addEventListener('submit',  (event) => { debugger
            event.preventDefault()

            const query = event.target.query.value
            const user = searchUser(query)
            if (!result) {
                searchResults(user)
            } else {
                this.container.removeChild(result.container)
                result.container = undefined
                searchResults(user)
            }
        })

        const searchResults = (user) => { 
            result = new Result(user)
            this.container.append(result.container)
        }

    }
}




