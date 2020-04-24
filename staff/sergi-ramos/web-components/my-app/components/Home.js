// TODO show "Welcome, <name>!"
class Home extends Components {

    constructor(user, logOut) {
        debugger
        super(`<section class="home">
                    <h1>Bienvenido ${user}</h1>
                    <button>Logout</button>
                </section>`)

        const search = new Search()

        this.container.appendChild(search.container)

        const logOutButton = this.container.querySelector('button')

        logOutButton.addEventListener('click', () => {

            logOut()
        })
        let result

        const searchButton = this.container.querySelector('form')
        searchButton.addEventListener('submit', (event) => {  debugger
            debugger
            event.preventDefault()

            const query = event.target.query.value
            const queryGoogle = event.target.queryGoogle.value
            if (query) {
                const user = searchUser(query)
                if (!result) {
                    searchResults(user)
                } else {
                    this.container.removeChild(result.container)
                    result.container = undefined
                    searchResults(user)
                }
            }
            if (queryGoogle) {
                searchGoogle(queryGoogle,  (listResults) =>{
                  const googleResults = new Google(listResults)
                    this.container.append(googleResults.container)
                })
            }


        })

        const searchResults = (user) => {
            result = new Result(user)
            this.container.append(result.container)
        }

    }
}




