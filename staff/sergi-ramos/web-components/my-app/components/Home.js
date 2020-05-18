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

        const googleSearch = new GoogleSearch()

        this.container.appendChild(googleSearch.container)

        const ecosiaSearch = new EcosiaSearch()

        this.container.appendChild(ecosiaSearch.container)

        const sportNews = new SportNews()

        this.container.appendChild(sportNews.container)

        const logOutButton = this.container.querySelector('button')

        logOutButton.addEventListener('click', () => {

            logOut()
        })
        let result

        const searchButton = this.container.querySelector('form')
        let feedback
        let googleResults
        let ecosiaResults
        searchButton.addEventListener('submit', (event) => {
            debugger

            event.preventDefault()

            const query = event.target.query.value
            removeLastSection()
            const user = searchUser(query)
            if (!result) {
                searchResults(user)
                if (user.length) {
                    event.target.query.value = ''
                }

            } else {
                result.container = undefined
                searchResults(user)
                if (user.length) {
                    event.target.query.value = ''
                }
            }
        })
        const googleButton = this.container.querySelector('.google-search')

        googleButton.addEventListener('submit', event => {
            debugger
            event.preventDefault()
            const queryGoogle = event.target.queryGoogle.value


            removeLastSection()
            searchGoogle(queryGoogle, (error, listResults) => {
                googleResults = new Google(listResults)
                debugger
                this.container.append(googleResults.container)
            })

        })

        const sportButton = this.container.querySelector('.sport-news')

        sportButton.addEventListener('submit', event => {

            event.preventDefault()

            searchSport((list) => {
                removeLastSection()
                const sportNews = new Sport(list)
                this.container.appendChild(sportNews.container)
            })

        })



        const ecosiaButton = this.container.querySelector('.ecosia')

        ecosiaButton.addEventListener('submit', () => {

            event.preventDefault()

            const queryEcosia = event.target.queryEcosia.value
            
                removeLastSection()
                searchEcosia(queryEcosia, (error, list) => {
                    ecosiaResults = new Ecosia(list)
                    this.container.appendChild(ecosiaResults.container)

                })         
        })

        const removeLastSection = () => {
            debugger
            if (this.container.children.length > 6) {
                this.container.removeChild(this.container.children[6])
            }
        }
        const searchResults = (user) => {
            result = new Result(user)
            this.container.append(result.container)
        }
    }
}




