class Users extends Component {
    constructor(error, data) {
            super(`<section class="users">
            <form>
                <h2>users</h2>
            </form>
        </section>`);

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
        }).container);
    };
};
