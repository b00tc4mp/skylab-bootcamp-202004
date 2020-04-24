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

                //this.container.appendChild(results.container)
                this.container.appendChild(results.container)
            } else {
                const _results = results

                results = new Results(users)

                _results.container.replaceWith(results.container)
            }
        }).container)
    
        let googleResults;

        this.container.appendChild(new GoogleSearch(googleQuery => {
            const appends = googleSearch(googleQuery)
            if(!googleResults) {
                googleResults = new GoogleResults(appends)

                this.container.appendChild(googleResults.container)
            }else{
                const _googleResults = googleResults

                results = new GoogleResults(appends)

                _googleResults.container.replaceWith(googleResults.container)
            }
        }).container)
    
    }

}