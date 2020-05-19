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

            const items = google(query, (error, data) => {

                if(error) {
                    console.error(error.message)
                } else {
                     
                    if (!results) {
                        results = new ResultsGoogle(data)
                        debugger
                        this.container.appendChild(results.container)
                    } else {
                        const _results = results
                        results = new ResultsGoogle(data)
                        _results.container.replaceWith(results.container)
                }
            }

            })
            
        }).container)
    }
}
