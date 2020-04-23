class Home extends Component {
    constructor(name, callback) {

        super(`<section class="home">
            <h1>Welcome, ${name}!</h1><button>Logout</button>
            </section>`)

        const button = this.container.querySelector('button')

        // const search = Search()

        let results

        button.addEventListener('click',()=> {
            callback()
        })

        this.container.appendChild(new Search(query => {
            const users = searchUsers(query)

            if (!results) {
                results = new Results(users)
                debugger
                this.container.appendChild(results.container)
            } else {
                const _results = results
                results = new Results(users)
                _results.container.replaceWith(results.container)
            }
        }).container)
    }
}
