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

        let listDisplayed = false

        const search = new Search((request, requestGoogle, requestEcosia) => {
            if (listDisplayed) this.container.removeChild(this.container.lastChild);

            if (request) {
                const usersFound = searchUsers(request);
                const results = new Results(usersFound);
                this.container.append(results.container);
                listDisplayed = true;
            }

            if (requestGoogle) {
                searchGoogle(requestGoogle, listResults => {
                    const results = new GoogleResults(listResults);
                    this.container.append(results.container);
                })

                listDisplayed = true
            }

            if (requestEcosia) {
                searchEcosia(requestEcosia, listResults => {
                    const results = new EcosiaResults(listResults);
                    this.container.append(results.container);
                })

                listDisplayed = true
            }
        });

        this.container.append(search.container);

        dailyNews(result =>{
            const results = new News (result)
            this.container.append(results.container)
        })

    }
}         