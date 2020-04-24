class Home extends Component {
    constructor(name, callback) {
        super(`<main class='main'>
        <h1 class='main__title'>Welcome ${name}</h1>
        <button class="main__button">Exit</button>
    </main>`)


        const button = this.container.querySelector('button');

        button.addEventListener('click', function() {
            callback()
        })

        let results;

        this.container.appendChild(new Search(query => {
            const users = searchUsers(query);

            if (!results) {
                results = new Results(users);
                this.container.appendChild(results.container);
            } else {
                const _results = results;
                results = new Results(users);
                _results.container.replaceWith(results.container);
            }
        }).container)
    }
}