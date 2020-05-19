class Home extends Component {
    constructor(name, onLogout) {

        super(`<section class="home">
                <h1'>Welcome ${name} !</h1>
            <button>Log out</button>
        </section>`)

        const button = this.container.querySelector('button');

        button.addEventListener('click', function () {
            event.preventDefault();

            onLogout()
        });

        let results

        const search = new Search((request, requestGoogle, requestEcosia) => {
            if (results) {
                this.container.removeChild(results.container);
                results = undefined
            }
            if (request) {
                const usersFound = searchUsers(request);
                results = new Results(usersFound);
                this.container.appendChild(results.container);
            }

            if (requestGoogle) {
                searchGoogle(requestGoogle, (error, listResults) => {
                    results = new SearchResults(listResults);
                    this.container.appendChild(results.container);
                })
            }

            if (requestEcosia) {
                searchEcosia(requestEcosia, (error, listResults) => {
                    results = new SearchResults(listResults);
                    this.container.appendChild(results.container);
                })
            }
        });

        this.container.appendChild(search.container);

        dailyNews(result =>{
            const NewsResults = new News (result)
            this.container.appendChild(NewsResults.container)
        })

    }
}         