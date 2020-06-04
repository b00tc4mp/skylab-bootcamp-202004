class Home extends Component {
    constructor(name, callback) {
        super(`<section class="home">
            <h1>Welcome, ${name}!</h1>
            <button>Logout</button>
        </section>`)

        const button = this.container.querySelector('button');

        button.addEventListener('click', (event) => {
            event.preventDefault();

            callback()
        });

        let results;

        this.container.appendChild(
            new Search((query) => {
                const users = searchUsers(query)

                if (!results) {
                    results = new Results(users)

                    this.container.appendChild(results.container)
                } else {
                    const _results = results

                    results = new Results(users)

                    _results.container.replaceWith(results.container)
                }
            }).container
        )

        this.container.appendChild(
            new Search((query) => {
                const info = searchInfo(query)

                if (!results) {
                    results = new Results(info)

                    this.container.appendChild(results.container)
                } else {
                    const _results = results

                    results = new Results(info)

                    _results.container.replaceWith(results.container)
                }
            }).container
        )
    }
}