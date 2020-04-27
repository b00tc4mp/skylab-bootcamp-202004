class Home extends Component {
    constructor(name, callback) {
        super(`<section class="home">
    <h1>Welcome, ${name}!</h1><button>Logout</button>
</section>`)

        const button = this.container.querySelector('button')

        button.addEventListener('click', function () {
            
            callback()
        })

        let results
        

        this.container.appendChild(new Search(query => {
            const users = searchUsers(query)

            if (!results) {
                results = new Results(users)

                this.container.appendChild(results.container)
            } else {
                const _results = results

                results = new Results(users)

                _results.container.replaceWith(results.container)
            }
        }).container)
        const googleSearch = new SearchGoogle(query => {
            google(query, (data) => {

                if (!results) {
                    results = new ResultsGoogle(data)

                    this.container.appendChild(results.container)
                } else {
                    const _results = results

                    results = new ResultsGoogle(data)

                    _results.container.replaceWith(results.container)
                }
            })


        })

        this.container.appendChild(googleSearch.container)
    }
}
